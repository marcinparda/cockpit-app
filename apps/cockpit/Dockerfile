FROM nginx:alpine

# Copy built files for the cockpit app
COPY  /dist/apps/cockpit /usr/share/nginx/html

# Copy custom nginx config that will handle the cockpit app
COPY apps/cockpit/nginx/cockpit.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
