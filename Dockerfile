# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY next.config.js ./
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/src src
COPY --from=builder /app/next.config.js ./
# DO NOT copy node_modules from builder!

RUN npm install --omit=dev
RUN npm rebuild sqlite3

EXPOSE 3000
CMD ["npm", "start"]