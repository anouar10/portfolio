#!/usr/bin/env bash
#
# One-time setup on the server so GitHub Actions can deploy to it.
# Run as the user that will own the deployment, not as root.
#
#   bash setup-server.sh
#
set -euo pipefail

REPO_SSH="${REPO_SSH:-git@github.com:USERNAME/portfolio.git}"
DEPLOY_PATH="${DEPLOY_PATH:-$HOME/portfolio}"

echo "==> Checking prerequisites"
command -v docker >/dev/null || { echo "Docker is not installed."; exit 1; }
docker compose version >/dev/null || { echo "Docker Compose v2 is required."; exit 1; }

if ! groups | grep -qw docker; then
  echo "Your user is not in the 'docker' group. Run:"
  echo "  sudo usermod -aG docker $USER   # then log out and back in"
  exit 1
fi

echo "==> Cloning into ${DEPLOY_PATH}"
if [ -d "${DEPLOY_PATH}/.git" ]; then
  git -C "${DEPLOY_PATH}" pull --ff-only
else
  git clone "${REPO_SSH}" "${DEPLOY_PATH}"
fi

cd "${DEPLOY_PATH}/deploy"

if [ ! -f .env ]; then
  echo "==> Creating .env with generated secrets"
  cp .env.example .env
  sed -i "s|^DB_PASSWORD=.*|DB_PASSWORD=$(openssl rand -base64 24)|" .env
  sed -i "s|^APP_SECRET=.*|APP_SECRET=$(openssl rand -base64 32)|" .env
  echo
  echo "    Now edit .env and set DOMAIN and ACME_EMAIL:"
  echo "      nano ${DEPLOY_PATH}/deploy/.env"
  echo
fi

# The prod override needs to know which image to pull.
if ! grep -q '^GITHUB_REPOSITORY=' .env; then
  read -rp "GitHub repository (owner/name): " GH_REPO
  echo "GITHUB_REPOSITORY=${GH_REPO}" >> .env
fi

mkdir -p letsencrypt
chmod 600 letsencrypt 2>/dev/null || true

echo "==> Generating a deploy key for GitHub Actions"
KEY_PATH="$HOME/.ssh/github_deploy"
if [ ! -f "${KEY_PATH}" ]; then
  ssh-keygen -t ed25519 -N "" -f "${KEY_PATH}" -C "github-actions-deploy"
  cat "${KEY_PATH}.pub" >> "$HOME/.ssh/authorized_keys"
  chmod 600 "$HOME/.ssh/authorized_keys"
fi

echo
echo "============================================================"
echo " Add these as GitHub repository secrets"
echo " (Settings → Secrets and variables → Actions)"
echo "============================================================"
echo
echo "SSH_HOST        = $(curl -s https://api.ipify.org || echo '<your public IP or hostname>')"
echo "SSH_USER        = ${USER}"
echo "SSH_PORT        = $(grep -E '^\s*Port\s' /etc/ssh/sshd_config 2>/dev/null | awk '{print $2}' | head -1 || echo 22)"
echo "DEPLOY_PATH     = ${DEPLOY_PATH}"
echo "DOMAIN          = $(grep '^DOMAIN=' .env | cut -d= -f2)"
echo
echo "SSH_PRIVATE_KEY = (the whole file below, including BEGIN/END lines)"
echo "------------------------------------------------------------"
cat "${KEY_PATH}"
echo "------------------------------------------------------------"
echo
echo "SSH_KNOWN_HOSTS = (the line below)"
echo "------------------------------------------------------------"
ssh-keyscan -p "$(grep -E '^\s*Port\s' /etc/ssh/sshd_config 2>/dev/null | awk '{print $2}' | head -1 || echo 22)" \
  localhost 2>/dev/null | sed "s/^localhost/$(curl -s https://api.ipify.org || echo HOST)/" || \
  echo "  run: ssh-keyscan -p PORT YOUR_HOST"
echo "------------------------------------------------------------"
echo
echo "Then, in the repository: Settings → Environments → New environment"
echo "named 'production'."
echo
echo "Finally, start the stack once by hand:"
echo "  cd ${DEPLOY_PATH}/deploy && make up"
