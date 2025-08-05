FROM nginx:alpine

# Copy built files for the cv app
COPY  /dist/apps/cv /usr/share/nginx/html

# Copy custom nginx config that will handle the cv app
COPY apps/cv/nginx/cv.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
