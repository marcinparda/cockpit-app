FROM nginx:alpine

# Copy built files for the login app
COPY --from=build /dist/apps/login /usr/share/nginx/html

# Copy custom nginx config that will handle the login app
COPY apps/login/nginx/login.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
