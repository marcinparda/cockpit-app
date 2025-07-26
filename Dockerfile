# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Optimize Nx for Docker environment
ENV NX_DAEMON=false
ENV NX_PARALLEL=1
ENV NX_SKIP_NX_CACHE=true
ENV CI=true

# Copy package files and configuration
COPY package*.json nx.json tsconfig*.json ./
RUN npm ci

# Copy source code
COPY . .

# Accept API_URL as build argument
ARG API_URL
ARG LOGIN_URL
ARG COCKPIT_URL

# Replace local dev envs in environments files before build
RUN sed -i "s|http://localhost:8000|${API_URL}|g" apps/ai-budget/src/environments/environments.ts
RUN sed -i "s|http://localhost:8000|${API_URL}|g" apps/todo/src/environments/environments.ts
RUN sed -i "s|http://localhost:4202|${LOGIN_URL}|g" apps/todo/src/environments/environments.ts
RUN sed -i "s|http://localhost:4203|${COCKPIT_URL}|g" apps/login/src/environments/environments.ts
RUN sed -i "s|http://localhost:8000|${API_URL}|g" libs/shared/auth/src/environments/environments.ts

# Build all applications
RUN npx nx run-many --target=build --configuration=production

# Production stage
FROM nginx:alpine

# Copy built files for both apps
COPY --from=build /app/dist/apps/ai-budget /usr/share/nginx/html/ai-budget
COPY --from=build /app/dist/apps/todo /usr/share/nginx/html/todo
COPY --from=build /app/dist/apps/login /usr/share/nginx/html/login

# Copy custom nginx config that will handle both apps
COPY nginx/multi-app.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 81 82
CMD ["nginx", "-g", "daemon off;"]
 