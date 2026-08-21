# Server setup

## What changed from the version you had

Your old `docker-compose.yml` had this under `portfolio`:

```yaml
    build:
      context: ..
      dockerfile: Dockerfile
```

That made the **server compile the site itself**, which is why `setup-server.sh`
needed a git clone and a GitHub deploy key. It also meant the image you push
from CI was never used.

Now the service just pulls:

```yaml
    image: ${IMAGE}:${TAG:-latest}
    pull_policy: always
```

So: no clone, no deploy key, no source on the server. Three files are all
it needs — `docker-compose.yml`, `docker-compose.prod.yml`, `.env`.

## Getting the files onto the server

From your laptop, in the project directory:

```bash
scp -r deploy/ USER@SERVER:~/portfolio/
```

(`deploy/docker-compose.local.yml`, `Makefile` and `setup-server.sh` come
along; `.env` does not exist yet and should never be committed or copied.)

## Then, on the server

```bash
# create a non-root user if you are still on root
adduser deploy
usermod -aG sudo,docker deploy
su - deploy

cd ~/portfolio/deploy
bash setup-server.sh          # first run creates .env and stops
nano .env                     # set IMAGE, DOMAIN, ACME_EMAIL
bash setup-server.sh          # second run validates and pulls
```

`IMAGE` is your **Docker Hub** namespace, e.g. `yourname/portfolio`. It has
to match the tags in `.github/workflows/deploy.yml`.

## Bring it up in two stages

Do not start all five containers at once. If something breaks you will not
know which layer.

**Stage 1 — does the image serve at all?**

```bash
make test
curl -I http://localhost:8080
curl    http://localhost:8080/healthz     # must print: ok
docker ps                                 # STATUS should reach "healthy"
```

If `/healthz` 404s, `deploy/nginx.conf` is missing its health block and the
container will sit permanently unhealthy. Fix that before continuing.

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml down
```

**Stage 2 — the real stack.**

```bash
make up
make logs
```

Certificates take 10–30 seconds. Watch for `acme` errors in the Traefik logs.

## Before stage 2: DNS

Let's Encrypt uses an HTTP challenge, so these must already resolve to the
server's public IP:

- `DOMAIN`
- `www.DOMAIN`
- `stats.DOMAIN` — only if you keep Umami

`setup-server.sh` warns if the A record does not match, but it only checks
the bare domain.

Ports 80 and 443 must be open, and nothing else can be bound to them. Check
with `sudo ss -ltnp | grep -E ':80|:443'`.

## Deploying a new build

After CI pushes a new image:

```bash
cd ~/portfolio/deploy && make update
```

That pulls, restarts only the portfolio container, and prunes images older
than a week. Automating this over SSH is the deploy job you removed from the
workflow — worth adding back once the manual path is reliable.

## Dropping the analytics

Umami and Postgres are optional. To remove them, delete the `umami` and
`umami-db` services from `docker-compose.prod.yml`, the `umami-data` volume,
and the `internal` network. Nothing else references them.

## Rate limits

While debugging TLS, use the Let's Encrypt staging server or you can hit the
5-failures-per-hour limit and be locked out. Add to the Traefik `command:`
list temporarily:

```
- --certificatesresolvers.le.acme.caserver=https://acme-staging-v02.api.letsencrypt.org/directory
```

Browsers will warn about the certificate — that is expected on staging.
Remove the line and delete `letsencrypt/acme.json` to get a real one.
