# Stage 1
FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY ./ ./
RUN npm run build
#CMD ["npm", "run", "start"]

# Stage 2
FROM nginx:1.23.1-alpine
# Set working directory to nginx resources directory
#WORKDIR /usr/share/nginx/html

# Remove default nginx static resources
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]