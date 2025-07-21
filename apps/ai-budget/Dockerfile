# Base image - use Node 20 to match Nx requirements
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Optimize Nx for Docker environment
ENV NX_DAEMON=false
ENV NX_PARALLEL=1
ENV NX_SKIP_NX_CACHE=true
ENV CI=true

# Copy package files first for better caching
COPY package.json package-lock.json ./
COPY nx.json tsconfig.base.json ./

# Install dependencies (this layer will be cached if package files don't change)
RUN npm ci --frozen-lockfile --production=false

# Copy only necessary files for ai-budget app build
COPY apps/ai-budget ./apps/ai-budget
COPY libs ./libs

# Copy root-level configuration files that Nx may need
COPY jest.config.ts jest.preset.js karma.conf.js ./
COPY eslint.config.mjs ./
COPY vitest.workspace.ts ./

# Build only the ai-budget application with optimized settings
RUN npx nx build ai-budget --skip-nx-cache --configuration=production

# Production image
FROM nginx:alpine

# Copy built assets from the build stage
COPY --from=build /app/dist/apps/ai-budget /usr/share/nginx/html

# Copy nginx configuration
COPY apps/ai-budget/nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]