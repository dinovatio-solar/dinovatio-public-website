# Etapa 1: build de Next en modo standalone
FROM node:20-bullseye-slim AS builder
WORKDIR /app

ENV CI=true
RUN node -v && npm -v

COPY package*.json ./
RUN npm ci || npm install

COPY . .
RUN npm run build

# Etapa 2: runtime con Node (sin Nginx)
FROM node:20-bullseye-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# copiar lo mínimo para correr standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# el standalone trae un server.js que arranca el app
CMD ["node", "server.js"]
