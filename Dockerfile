FROM node:18.16-alpine3.16 as base

WORKDIR /home/node/app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .

FROM node:18.16-alpine3.16 as builder
WORKDIR /home/node/app
COPY --from=base /home/node/app ./
COPY --from=base /home/node/app/migrate.js ./
RUN yarn run build

FROM node:18.16-alpine3.16 as production
WORKDIR /home/node/app
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/src/api/public/openapi.yaml ./dist/src/api/public/openapi.yaml
COPY --from=builder /home/node/app/src/api/custodian/openapi.yaml ./dist/src/api/custodian/openapi.yaml
COPY --from=builder /home/node/app/.env .env
COPY --from=builder /home/node/app/migrate.js ./
COPY package* yarn.lock ./
RUN yarn install --production=true