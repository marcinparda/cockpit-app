# Stage 1: Build the Angular app
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx nx build cockpit-app --configuration=production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/apps/cockpit-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
