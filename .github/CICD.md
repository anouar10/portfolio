# CI/CD

Two workflows:

- **`ci.yml`** — runs on pull requests and on any branch that isn't `main`.
  Lints, builds, and confirms the Docker image still builds. Nothing is
  published.
- **`deploy.yml`** — runs when `main` moves. Builds the image, pushes it to the
  GitHub Container Registry, then tells the server to pull and restart. Checks
  the site answers afterwards, and rolls back if it doesn't.

The server never builds anything. Compiling a Vite bundle on a home machine is
slow and steals CPU from the running site; GitHub builds it once and the server
just pulls the layers that changed.

```
git push main
    │
    ├─▶ lint + build                      (fails fast, ~40s)
    ├─▶ docker build ──▶ ghcr.io/you/portfolio:latest
    └─▶ ssh ──▶ docker compose pull && up -d
            └─▶ curl /healthz ──▶ if it fails, roll back
```

## Setting it up

### 1. On the server

```bash
cd ~/portfolio/deploy
REPO_SSH=git@github.com:YOURNAME/portfolio.git bash setup-server.sh
```

It clones the repo, generates the `.env` secrets, creates a dedicated SSH key
for Actions, and prints every value you need to paste into GitHub.

### 2. In the repository

**Settings → Secrets and variables → Actions**, add:

| Secret | What it holds |
|---|---|
| `SSH_HOST` | your public IP or hostname |
| `SSH_USER` | the user that owns the deployment |
| `SSH_PORT` | your SSH port |
| `SSH_PRIVATE_KEY` | the private key the script generated, in full |
| `SSH_KNOWN_HOSTS` | the `ssh-keyscan` line, so the runner can verify the host |
| `DEPLOY_PATH` | e.g. `/home/anwar/portfolio` |
| `DOMAIN` | e.g. `anwar.dev` |

**Settings → Environments → New environment**, named `production`. Optional but
worth it: add yourself as a required reviewer and every deploy waits for a click.

### 3. Make the image pullable

The server needs to fetch from GHCR. Easiest path — publish the package:

**Your profile → Packages → portfolio → Package settings → Change visibility →
Public.** The image holds nothing secret; it's a static site.

If you'd rather keep it private, create a PAT with `read:packages` and log in
on the server once:

```bash
echo "$PAT" | docker login ghcr.io -u YOURNAME --password-stdin
```

### 4. First deploy

```bash
git push origin main
```

Watch it in the Actions tab. The first run is slow (no layer cache); later runs
land in about a minute.

## Security: exposing SSH to the internet

The deploy job SSHes in from GitHub's runners, which means port 22 has to be
reachable from anywhere. On a home server that's a genuine exposure — SSH ports
get scanned continuously.

Minimum hardening, in `/etc/ssh/sshd_config`:

```
PasswordAuthentication no
PermitRootLogin no
Port 2222              # not security, but cuts the noise dramatically
```

Then `sudo systemctl restart ssh` and install `fail2ban`.

**The better option for a home server: a self-hosted runner.** The runner polls
GitHub outbound, so you open no inbound ports at all.

```bash
# on the server, following GitHub's setup instructions:
# Settings → Actions → Runners → New self-hosted runner
./config.sh --url https://github.com/YOU/portfolio --token ...
sudo ./svc.sh install && sudo ./svc.sh start
```

Then in `deploy.yml`, change the deploy job to `runs-on: self-hosted` and
replace the SSH block with plain local commands — no keys, no known_hosts, no
exposed port. A third option, if you already use it, is Tailscale: add
`tailscale/github-action` to the job and keep SSH bound to the tailnet only.

I'd pick the self-hosted runner. It removes the whole attack surface rather
than hardening it.

## Everyday use

```bash
git checkout -b add-project
# edit, commit
git push -u origin add-project     # CI runs, no deploy
# open a PR, merge it
                                    # deploy runs on merge
```

Re-deploy without a code change: **Actions → Deploy → Run workflow**.

Roll back to an earlier build:

```bash
# on the server
docker compose -f docker-compose.yml -f docker-compose.prod.yml \
  down portfolio
docker tag ghcr.io/YOU/portfolio:sha-<commit> ghcr.io/YOU/portfolio:latest
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d portfolio
```

Every commit is tagged with its full SHA, so any past build can be restored.

## What Dependabot does

`.github/dependabot.yml` opens weekly PRs for npm updates (grouped, so you get
one PR rather than five), monthly ones for the Actions and base images. Each PR
runs CI, so you can see it still builds before merging. It won't deploy on its
own — that only happens when you merge to `main`.
