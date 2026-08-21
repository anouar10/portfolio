# syntax=docker/dockerfile:1

# ---- stage 1: build the static site -----------------------------------------
FROM node:24-alpine AS build

WORKDIR /app

# Copy manifests first so this layer caches until dependencies actually change.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN npm run build

# ---- stage 2: serve it ------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Drop nginx's default site and use ours.
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx.conf /etc/nginx/conf.d/portfolio.conf

COPY --from=build /app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]