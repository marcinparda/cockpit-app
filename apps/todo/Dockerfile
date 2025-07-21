# Base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./
COPY nx.json tsconfig.base.json ./

# Install dependencies (this layer will be cached if package files don't change)
RUN npm ci --frozen-lockfile

# Copy only necessary files for todo app build
COPY apps/todo ./apps/todo
COPY libs ./libs

# Copy root-level configuration files that Nx may need
COPY jest.config.ts jest.preset.js karma.conf.js ./
COPY eslint.config.mjs ./
COPY vitest.workspace.ts ./

# Build only the todo application
RUN npx nx build todo --skip-nx-cache --configuration=production

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
