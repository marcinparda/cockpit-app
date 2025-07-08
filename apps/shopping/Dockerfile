# Base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build -- --project=todo --configuration=production

# Production image
FROM nginx:alpine

# Copy built assets from the build stage
COPY --from=build /app/dist/apps/todo /usr/share/nginx/html

# Copy nginx configuration
COPY apps/todo/nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
