#!/usr/bin/env bash
#
# One-time server setup for the portfolio stack.
#
# The server PULLS a prebuilt image from Docker Hub. It never compiles the
# site, so it does not need your source, a git clone, or a GitHub deploy key.
# Only three files have to reach the server: the two compose files and .env.
#
#   bash setup-server.sh
#
set -euo pipefail

echo "==> Checking prerequisites"

if [ "$(id -u)" -eq 0 ]; then
  echo "Refusing to run as root. Create a normal user first:"
  echo "  adduser deploy && usermod -aG sudo,docker deploy && su - deploy"
  exit 1
fi

command -v docker >/dev/null || { echo "Docker is not installed. See https://get.docker.com"; exit 1; }
docker compose version >/dev/null 2>&1 || { echo "Docker Compose v2 is required."; exit 1; }

if ! id -nG "$USER" | grep -qw docker; then
  echo "Your user is not in the 'docker' group. Run:"
  echo "  sudo usermod -aG docker $USER    # then log out and back in"
  exit 1
fi

for f in docker-compose.yml docker-compose.prod.yml .env.example; do
  [ -f "$f" ] || { echo "Missing $f -- run this from the deploy/ directory."; exit 1; }
done

if [ ! -f .env ]; then
  echo "==> Creating .env with generated secrets"
  cp .env.example .env
  sed -i "s|^DB_PASSWORD=.*|DB_PASSWORD=$(openssl rand -base64 24)|" .env
  sed -i "s|^APP_SECRET=.*|APP_SECRET=$(openssl rand -base64 32)|" .env
  echo
  echo "    Now edit .env and set IMAGE, DOMAIN and ACME_EMAIL:"
  echo "      nano $(pwd)/.env"
  echo
  echo "    IMAGE must be your DOCKER HUB namespace, e.g. yourname/portfolio"
  echo
  exit 0
fi

# --- sanity-check .env before doing anything that can fail slowly ------------
missing=0
for var in IMAGE DOMAIN ACME_EMAIL; do
  val=$(grep -E "^${var}=" .env | cut -d= -f2- || true)
  case "$val" in
    ""|YOUR_DOCKERHUB_USERNAME/portfolio|example.com|you@example.com)
      echo "  .env: ${var} is still unset or a placeholder"
      missing=1 ;;
  esac
done
[ "$missing" -eq 0 ] || { echo "Fix .env, then re-run."; exit 1; }

mkdir -p letsencrypt
chmod 700 letsencrypt

# shellcheck disable=SC1091
set -a; . ./.env; set +a

echo "==> Checking DNS for ${DOMAIN}"
server_ip=$(curl -fsS https://api.ipify.org 2>/dev/null || echo "")
domain_ip=$(getent hosts "${DOMAIN}" 2>/dev/null | awk '{print $1}' | head -1 || echo "")
if [ -n "$server_ip" ] && [ -n "$domain_ip" ] && [ "$server_ip" != "$domain_ip" ]; then
  echo "  WARNING: ${DOMAIN} resolves to ${domain_ip}, this server is ${server_ip}."
  echo "  Let's Encrypt will fail until the A record points here."
elif [ -z "$domain_ip" ]; then
  echo "  WARNING: ${DOMAIN} does not resolve yet."
else
  echo "  OK: ${DOMAIN} -> ${domain_ip}"
fi

echo "==> Pulling ${IMAGE}:${TAG:-latest}"
docker compose -f docker-compose.yml -f docker-compose.prod.yml pull portfolio

echo
echo "============================================================"
echo " Ready. Bring it up in stages:"
echo "============================================================"
echo
echo "  1. Prove the image serves (no proxy, no TLS):"
echo "       docker compose -f docker-compose.yml -f docker-compose.local.yml up -d"
echo "       curl -I http://localhost:8080"
echo "       curl    http://localhost:8080/healthz     # must print: ok"
echo "       docker ps                                 # STATUS -> healthy"
echo "       docker compose -f docker-compose.yml -f docker-compose.local.yml down"
echo
echo "  2. Then the real stack:"
echo "       docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d"
echo "       docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f traefik"
echo
echo "  Certificates take 10-30s. Watch the traefik logs for acme errors."
echo
