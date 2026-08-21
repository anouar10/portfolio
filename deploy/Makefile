.PHONY: up down rebuild logs stats-tail visits refs bots top-pages

up:            ## build and start everything
	docker compose up -d --build

down:          ## stop everything (data volumes survive)
	docker compose down

rebuild:       ## rebuild the site after editing the portfolio source
	docker compose up -d --build portfolio

logs:          ## follow all container logs
	docker compose logs -f

# --- raw access-log queries --------------------------------------------------

stats-tail:    ## live view of incoming requests
	docker compose exec portfolio tail -f /var/log/nginx/access.json

visits:        ## page views per day, bots excluded
	@docker compose exec -T portfolio cat /var/log/nginx/access.json \
	 | jq -r 'select(.path=="/" or (.path|endswith(".html"))) \
	          | select(.user_agent|test("bot|crawl|spider";"i")|not) \
	          | .time[0:10]' \
	 | sort | uniq -c | sort -rn

refs:          ## which application links were opened, and when
	@docker compose exec -T portfolio cat /var/log/nginx/access.json \
	 | jq -r 'select(.ref != "") | "\(.time[0:16])  \(.ref)  \(.ip)"' \
	 | sort -r | head -50

top-pages:     ## most requested paths
	@docker compose exec -T portfolio cat /var/log/nginx/access.json \
	 | jq -r '.path' | sort | uniq -c | sort -rn | head -20

bots:          ## how much of your traffic is automated
	@docker compose exec -T portfolio cat /var/log/nginx/access.json \
	 | jq -r 'if (.user_agent|test("bot|crawl|spider";"i")) then "bot" else "human" end' \
	 | sort | uniq -c
