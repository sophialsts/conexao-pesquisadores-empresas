# Base: instala dependências
FROM node:18-bullseye AS base

WORKDIR usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


# Dev: inicia em ambiente de desenvolvimento com hot reload
FROM base AS dev

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]


# Builder: build da aplicação
FROM base AS builder

ENV NODE_ENV=production

RUN npm run build


# Prod: inicia o ambiente de produção
FROM node:18 AS prod
WORKDIR /usr/src/app

ARG PORT

COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.ts ./next.config.ts

ENV NODE_ENV=production
EXPOSE $PORT
CMD ["npm", "start"]