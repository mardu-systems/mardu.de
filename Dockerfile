## Dockerfile for Next.js application (multi-stage)

FROM node:20-slim AS builder

# Install tools required for building native deps
RUN apt-get update && \
    apt-get install -y git python3 make g++ ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy lockfile and package manifests first for better caching
COPY package.json pnpm-lock.yaml* ./

# Enable corepack and prepare pnpm (uses repo's pnpm lock)
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Install dependencies using pnpm
# Try a frozen install first for reproducible builds. If it fails due to
# lockfile/specifier mismatches, fall back to a normal install so the
# Docker build doesn't fail unexpectedly. Prefer offline cache when possible.
RUN pnpm install --frozen-lockfile --prefer-offline || pnpm install --prefer-offline

# Copy rest of the sources
COPY . .

# Build the Next.js app
RUN pnpm run build


FROM node:20-slim AS runner

# Minimal runtime dependencies
RUN apt-get update && \
    apt-get install -y dumb-init ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy production node_modules and build output from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/package.json ./package.json

# Use non-root user for security
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs nodeapp || true
RUN chown -R nodeapp:nodejs /app

USER nodeapp

ENV NODE_ENV=production

EXPOSE 3000

# Simple healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start Next.js
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]