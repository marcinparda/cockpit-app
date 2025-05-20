# Stage 1: Build the Angular app
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx nx build ai-budget --configuration=production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/apps/ai-budget /usr/share/nginx/html
COPY apps/ai-budget/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
