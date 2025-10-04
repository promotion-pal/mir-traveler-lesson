FROM node:18-alpine AS base
RUN corepack enable

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

ARG NEXT_PUBLIC_API
ARG NEXT_PUBLIC_TEST_API
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_TEST_SITE_URL

ENV NEXT_PUBLIC_API=${NEXT_PUBLIC_API} \
    NEXT_PUBLIC_TEST_API=${NEXT_PUBLIC_TEST_API} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_TEST_SITE_URL=${NEXT_PUBLIC_TEST_SITE_URL} 

COPY package.json pnpm-lock.yaml .npmrc* ./
# RUN pnpm install --frozen-lockfile
RUN pnpm install --no-frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API
ARG NEXT_PUBLIC_TEST_API
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_TEST_SITE_URL

ENV NEXT_PUBLIC_API=${NEXT_PUBLIC_API} \
    NEXT_PUBLIC_TEST_API=${NEXT_PUBLIC_TEST_API} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_TEST_SITE_URL=${NEXT_PUBLIC_TEST_SITE_URL} 

RUN pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG NEXT_PUBLIC_API
ARG NEXT_PUBLIC_TEST_API
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_TEST_SITE_URL

ENV NEXT_PUBLIC_API=${NEXT_PUBLIC_API} \
    NEXT_PUBLIC_TEST_API=${NEXT_PUBLIC_TEST_API} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_TEST_SITE_URL=${NEXT_PUBLIC_TEST_SITE_URL} 

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
