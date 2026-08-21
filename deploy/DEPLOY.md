# Deploying on your own server

Four containers behind Traefik: the portfolio itself, Umami for analytics, its
Postgres database, and Traefik terminating TLS with certificates it renews on
its own.

```
internet ──▶ Traefik :80/:443 ──┬──▶ portfolio   (nginx, static build)
             Let's Encrypt      └──▶ umami       (stats.<domain>)
                                          │
                                     umami-db    (internal network only)
```

## Before you start

1. **Point DNS at your server.** Two A records to your public IP:
   - `anwar.dev` → `1.2.3.4`
   - `stats.anwar.dev` → `1.2.3.4`

2. **Open ports 80 and 443** on the router and the firewall. Port 80 must stay
   open even though everything redirects to HTTPS — Let's Encrypt uses it to
   validate the certificate.

3. **If your ISP gives you a dynamic IP**, add a DDNS client (ddclient,
   Cloudflare's API, or your router's built-in one). Otherwise the domain
   breaks the next time the IP rotates.

## Start it

```bash
cd deploy
cp .env.example .env
openssl rand -base64 24     # paste into DB_PASSWORD
openssl rand -base64 32     # paste into APP_SECRET
nano .env                   # set DOMAIN and ACME_EMAIL

make up
```

First boot takes a minute or two while Traefik requests certificates. Then:

- Portfolio → `https://<your-domain>`
- Analytics → `https://stats.<your-domain>` (login `admin` / `umami` — **change
  this immediately**)

In Umami, add a website, copy the generated ID, and paste it into the
`data-website-id` in `index.html` along with your domain. Then `make rebuild`.

## Answering "did that recruiter look at my portfolio?"

Give every application its own link:

```
https://anwar.dev/?ref=acme-backend
https://anwar.dev/?ref=inaz-followup
https://anwar.dev/?ref=linkedin-bio
```

Umami records the full URL, so each tag becomes its own row. You see the click,
the timestamp, how long they stayed and which sections they scrolled to. Raw
nginx logs carry the same tag in a dedicated `ref` field:

```bash
make refs        # every tagged visit, newest first
make visits      # page views per day, bots excluded
make top-pages   # what people actually read
make bots        # how much traffic is automated
make stats-tail  # live tail of incoming requests
```

This works far better than trying to identify visitors by IP. Corporate traffic
comes through NAT, recruiters browse from phones on carrier networks, and
reverse-DNS resolves only a small fraction of visits. The tagged link tells you
exactly who opened it because you controlled who received it.

Treat the timing as a signal, not a verdict. A visit right after you apply is
meaningful; no visit could just mean they read the PDF attachment instead.

## Updating the site

```bash
# edit anything under src/
make rebuild
```

Only the portfolio container restarts. Analytics data lives in a named volume
and survives rebuilds, `docker compose down`, and image changes.

## Backups

The only irreplaceable state is the analytics database:

```bash
docker compose exec umami-db pg_dump -U umami umami | gzip > umami-$(date +%F).sql.gz
```

Worth a weekly cron job. Certificates in `deploy/letsencrypt/` are worth keeping
too — losing them isn't fatal, but Let's Encrypt rate-limits re-issuance.

## A word on privacy law

You're targeting French and Italian employers, so GDPR applies to your site.

Umami was chosen for exactly this reason: it sets no cookies and stores no
personal identifiers, which is why **no consent banner is required**. That's
both the lawful option and the one that doesn't put a modal in front of a
recruiter's first impression.

The nginx access log is a different matter — it records IP addresses, which
count as personal data under GDPR. Keep it for operational purposes, rotate it
(30 days is a reasonable retention period), and don't try to attach names to
the addresses. A short privacy note in your footer covers you and costs nothing:

> This site uses privacy-friendly analytics. No cookies, no personal data,
> no third-party tracking. Server logs are kept 30 days for security purposes.

Add log rotation with a `logrotate` config on the host or a periodic
`truncate -s 0` on the log volume.

## Troubleshooting

**Certificates won't issue.** Check that port 80 reaches the server from
outside — `curl -I http://<your-domain>` from a phone on mobile data, not from
your LAN. Router hairpinning hides this problem from inside the network.

**Site loads, stats don't.** The tracking script is blocked by ad blockers less
often than Google Analytics, but it happens. Check `stats.<domain>/script.js`
loads directly in a browser.

**502 from Traefik.** The portfolio container failed its health check. Run
`docker compose logs portfolio`.
