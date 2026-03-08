# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# OpenSSL kütüphanesini ekle
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start:dev"]

# Production build stage
FROM node:20-alpine AS build

WORKDIR /app

# OpenSSL kütüphanesini ekle
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# OpenSSL kütüphanesini ekle
RUN apk add --no-cache openssl

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 3001

CMD ["node", "dist/main"]
