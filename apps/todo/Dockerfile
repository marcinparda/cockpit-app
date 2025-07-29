FROM nginx:alpine

# Copy built files for the todo app
COPY  /dist/apps/todo /usr/share/nginx/html

# Copy custom nginx config that will handle the todo app
COPY apps/todo/nginx/todo.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
