# portfolio — infrastructure

Everything needed to build the site into a container, push it to Docker Hub,
and serve it behind Traefik with automatic HTTPS.

**This is not your application.** No `src/`, `package.json`, `index.html` or
any of your actual portfolio code is included here — those stay exactly as
they are. Drop these files into your existing repo alongside them.

## What goes where

```
portfolio/
├── .dockerignore                     new
├── .gitignore                        new (merge with yours if you have one)
├── Dockerfile                        replaces yours
├── README.md                         this file
├── .github/
│   └── workflows/
│       ├── ci.yml                    REPLACES yours (was a duplicate of deploy)
│       └── deploy.yml                replaces yours
├── deploy/
│   ├── .env.example                  new
│   ├── Makefile                      new
│   ├── docker-compose.yml            replaces yours
│   ├── docker-compose.local.yml      new
│   ├── docker-compose.prod.yml       replaces yours
│   ├── nginx.conf                    replaces yours — adds /healthz
│   └── setup-server.sh               replaces yours
└── src/  package.json  ...           YOUR CODE — untouched
```

## The two workflows

They had become identical copies, which meant every push to `main` built
twice and two runners raced to push the same tag. Now they do different jobs:

| File         | Runs on                    | Pushes? |
| ------------ | -------------------------- | ------- |
| `ci.yml`     | branches and PRs, not main | no      |
| `deploy.yml` | `main`, or manually        | yes     |

`ci.yml` also starts the built image and curls `/healthz`, so a broken nginx
config fails the PR instead of reaching the registry.

## One-time setup

**1. Docker Hub token**

hub.docker.com → avatar → Account Settings → Personal access tokens →
Generate new token → **Read & Write**. Shown once.

**2. GitHub secrets**

Settings → Secrets and variables → Actions → **Secrets** tab:

| Name                 | Value                                     |
| -------------------- | ----------------------------------------- |
| `DOCKERHUB_USERNAME` | your Docker Hub username                  |
| `DOCKERHUB_TOKEN`    | the token from step 1                     |

Paste with no quotes and no trailing newline — a stray character produces
`malformed HTTP Authorization header`, which looks nothing like a typo.

**3. The image name**

`.github/workflows/deploy.yml` has two `tags:` lines. Both must use your
**Docker Hub** namespace. Note this is a different account from GitHub —
mixing them up gives a 401 that reads as "insufficient scopes", because you
are pushing into a namespace you do not own.

The same name goes in `deploy/.env` as `IMAGE`.

## Verify before you touch a server

```bash
docker pull YOURNAME/portfolio:latest
docker run -d -p 8080:80 --name portfolio YOURNAME/portfolio:latest
curl http://localhost:8080/healthz    # must print: ok
docker ps                             # STATUS should reach "healthy"
```

## Server

See `SERVER-NOTES.md`. Short version: copy `deploy/` to the server, run
`setup-server.sh` twice (it stops after creating `.env` so you can edit it),
then `make test`, then `make up`.

## Things that must match your project

- **`Dockerfile` copies `/app/dist`.** Vite → `dist`, CRA → `build`,
  Next static export → `out`. Wrong path builds fine and serves a 404 page.
- **`package-lock.json` must be committed** — `npm ci` fails without it.
- **`npm run build` must exist** in `package.json`.
