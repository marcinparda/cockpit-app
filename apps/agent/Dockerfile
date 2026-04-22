FROM nginx:alpine

COPY /dist/apps/agent /usr/share/nginx/html
COPY apps/agent/nginx/agent.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
