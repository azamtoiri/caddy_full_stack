# 1. Сборка фронта
FROM node:24-alpine AS builder

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive

COPY . .
RUN yarn run build

# 2. Статичный сервер (nginx или caddy)
FROM caddy:latest

# Копируем сборку Vite в Caddy
COPY --from=builder /app/dist /srv

# Простой Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
