FROM oven/bun:1-alpine as base

COPY package.json .
COPY bun.lockb .
COPY index.ts .
RUN bun install --frozen-lockfile --production

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ] 