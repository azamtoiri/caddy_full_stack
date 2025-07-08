# 1. Сборка фронта
FROM node:24-alpine AS builder

WORKDIR /app

COPY ./package.json ./
RUN yarn install

COPY . .
RUN npm run build

# 2. Статичный сервер (nginx или caddy)
FROM caddy:latest

# Копируем сборку Vite в Caddy
COPY --from=builder /app/dist /srv

# Простой Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
