FROM nginx:alpine

COPY dist/apps/store /usr/share/nginx/html

COPY apps/store/nginx/store.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
