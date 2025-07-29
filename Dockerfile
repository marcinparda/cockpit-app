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
ARG TODO_URL
ARG BUDGET_URL

# Replace local dev envs with production URLs
RUN sed -i "s|http://localhost:4200|${BUDGET_URL}|g" libs/shared/utils/src/lib/environments/environments.ts
RUN sed -i "s|http://localhost:4201|${TODO_URL}|g" libs/shared/utils/src/lib/environments/environments.ts
RUN sed -i "s|http://localhost:4202|${LOGIN_URL}|g" libs/shared/utils/src/lib/environments/environments.ts
RUN sed -i "s|http://localhost:4203|${COCKPIT_URL}|g" libs/shared/utils/src/lib/environments/environments.ts
RUN sed -i "s|http://localhost:8000|${API_URL}|g" libs/shared/utils/src/lib/environments/environments.ts

# Build all applications
RUN npx nx run-many --target=build --configuration=production --parallel=8

# Production stage
FROM nginx:alpine

# Copy built files for both apps
COPY --from=build /app/dist/apps/ai-budget /usr/share/nginx/html/ai-budget
COPY --from=build /app/dist/apps/todo /usr/share/nginx/html/todo
COPY --from=build /app/dist/apps/login /usr/share/nginx/html/login
COPY --from=build /app/dist/apps/cockpit /usr/share/nginx/html/cockpit

# Copy custom nginx config that will handle both apps
COPY nginx/multi-app.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 81 82 83
CMD ["nginx", "-g", "daemon off;"]
 