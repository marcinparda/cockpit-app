# Stage 1: Build the Angular app
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx nx build ai-budget --configuration=production
RUN npx nx serve ai-budget --configuration=production