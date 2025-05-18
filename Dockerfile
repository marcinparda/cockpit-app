# Build stage
FROM node:20-alpine AS build


# Install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg2 \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libx11-xcb1 \
    libxcomposite1 \
    libxrandr2 \
    libxss1 \
    libxcursor1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libxshmfence1 \
    --no-install-recommends

# Add Google Chrome’s official GPG key and repository
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list

# Install Google Chrome
RUN apt-get update && apt-get install -y google-chrome-stable --no-install-recommends

# (Optional) Add a non-root user for running Chrome
RUN useradd -m chromeuser
USER chromeuser

# Set environment variable for Chrome binary
ENV CHROME_BIN=/usr/bin/google-chrome

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application - specify the project name
RUN npm run build -- cockpit-app --configuration=production
# Debug - list the output directory structure
RUN ls -la dist/

# Serve stage
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/apps/cockpit-app /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
