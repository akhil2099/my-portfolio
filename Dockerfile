# Use an official Node.js runtime as a parent image
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine

# Install necessary dependencies like Certbot
RUN apk --no-cache add certbot bash curl

# Copy the built React app to the Nginx server's default location
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx SSL setup script
COPY ./scripts/setup_nginx_ssl.sh /usr/local/bin/setup_nginx_ssl.sh

# Give execution permission to the script
RUN chmod +x /usr/local/bin/setup_nginx_ssl.sh

# Expose port 80 and 443 for SSL
EXPOSE 80 443

# Start Nginx and run the SSL setup script
CMD ["/bin/bash", "-c", "/usr/local/bin/setup_nginx_ssl.sh && nginx -g 'daemon off;'"]
