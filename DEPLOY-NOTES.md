# Portfolio — build & run notes

## The two accounts

These are different and were the source of the whole 401 saga:

| Thing                     | Value              |
| ------------------------- | ------------------ |
| GitHub username / repo    | `anouar10`         |
| **Docker Hub username**   | `anwar123456789`   |

Every image tag uses the **Docker Hub** name. Pushing to `anouar10/...`
means pushing into a namespace you do not own, which Docker Hub reports
as "insufficient scopes" rather than something more obvious.

## File placement

Copy these into the repo root, keeping the structure:

```
portfolio/
├── .dockerignore
├── Dockerfile
├── .github/
│   └── workflows/
│       └── deploy.yml        <- replaces your existing deploy.yml
└── deploy/
    ├── nginx.conf
    ├── docker-compose.yml
    └── docker-compose.prod.yml
```

Your existing `ci.yml` is untouched. If it also builds and pushes an image,
it needs the same Buildx + login steps and the same username fix, or it
will keep failing on its own.

## Required secrets

Settings → Secrets and variables → Actions → **Secrets** tab (not Variables):

| Name                 | Value                                     |
| -------------------- | ----------------------------------------- |
| `DOCKERHUB_USERNAME` | `anwar123456789`                          |
| `DOCKERHUB_TOKEN`    | a fresh Docker Hub PAT, **Read & Write**  |

The token used during debugging was pasted into a chat window — treat it as
compromised, revoke it at hub.docker.com → Account Settings → Personal
access tokens, and generate a replacement.

## After a green run

```bash
docker pull anwar123456789/portfolio:latest
docker run -d -p 8080:80 --name portfolio anwar123456789/portfolio:latest
```

Then check both:

- http://localhost:8080         — the site
- http://localhost:8080/healthz — must return `ok`

Confirm the healthcheck passes:

```bash
docker ps          # STATUS should reach "healthy" within ~40s
```

Or with compose, from the `deploy/` directory:

```bash
docker compose pull portfolio
docker compose up -d portfolio
```

## Things to verify for your project specifically

1. **Build output directory.** The Dockerfile copies `/app/dist`.
   Vite → `dist`, CRA → `build`, Next static export → `out`.
   Wrong path = image builds fine but serves nginx's 404 page.

2. **`npm run build` exists** in package.json.

3. **`package-lock.json` is committed.** `npm ci` fails without it.

## What was wrong, for reference

1. No `setup-buildx-action`, so the build ran on the `docker` driver, which
   cannot export cache → "Cache export is not supported for the docker driver".
2. No login step at all, so the push was anonymous → 401.
3. Image tagged with the GitHub username instead of the Docker Hub one → 401.
4. The file mixed registries: `env:` declared `ghcr.io` and the rollback step
   tagged `ghcr.io/...`, while the build pushed to Docker Hub.

## Restoring the deploy job later

The SSH-based rollout job was removed since you are pulling manually. It is
still in your git history. When you bring it back, three things need fixing
in the old version:

- The rollback step tagged `ghcr.io/${{ github.repository }}:latest` while
  the build pushed to Docker Hub — those must reference the same registry,
  and `github.repository` is `anouar10/portfolio`, the wrong namespace.
- `DEPLOY_PATH` was set as an env var and then never used; the heredoc
  interpolated the secret directly instead. Pass it through the ssh command
  as an environment variable so paths with spaces or quotes do not break it.
- It needs seven more secrets: `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS`,
  `SSH_HOST`, `SSH_USER`, `SSH_PORT`, `DEPLOY_PATH`, `DOMAIN`.
