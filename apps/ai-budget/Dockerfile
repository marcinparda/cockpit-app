FROM nginx:alpine

# Copy built files for the ai-budget app
COPY  /dist/apps/ai-budget /usr/share/nginx/html

# Copy custom nginx config that will handle both apps
COPY apps/ai-budget/nginx/ai-budget.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
