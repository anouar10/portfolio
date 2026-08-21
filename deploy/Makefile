# Convenience wrappers. Run from the deploy/ directory.
COMPOSE      := docker compose -f docker-compose.yml -f docker-compose.prod.yml
COMPOSE_TEST := docker compose -f docker-compose.yml -f docker-compose.local.yml

.PHONY: test up down logs pull update ps health

## Stage 1: serve on :8080 with no proxy, to prove the image works
test:
	$(COMPOSE_TEST) up -d
	@echo "http://localhost:8080  and  /healthz"

## Stage 2: the real stack, with Traefik and TLS
up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f --tail=100

pull:
	$(COMPOSE) pull

## Deploy a new image built by CI
update:
	$(COMPOSE) pull portfolio
	$(COMPOSE) up -d portfolio
	$(COMPOSE) exec -T portfolio true && echo "portfolio restarted"
	docker image prune -f --filter "until=168h"

ps:
	$(COMPOSE) ps

health:
	@docker inspect --format '{{.Name}}: {{.State.Health.Status}}' portfolio 2>/dev/null \
	  || echo "portfolio is not running"
