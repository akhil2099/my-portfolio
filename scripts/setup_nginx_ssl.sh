#!/bin/bash

# Ensure necessary directories exist
mkdir -p /etc/nginx/conf.d
mkdir -p /etc/letsencrypt/live

# Check if DOMAIN and EMAIL environment variables are available
if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
  echo "DOMAIN or EMAIL is not set, exiting..."
  exit 1
fi

# Install necessary packages
echo "Installing Certbot and Nginx..."
apk --no-cache add certbot nginx

# Stop Nginx temporarily to free port 80 for Certbot
echo "Stopping Nginx..."
nginx -s stop

# Test networking
echo "Testing port 80 and 443..."
nc -zv 127.0.0.1 80 || echo "Port 80 is not open locally."
nc -zv 127.0.0.1 443 || echo "Port 443 is not open locally."

# Check if SSL certificates already exist
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "Obtaining SSL certificates from Let's Encrypt..."
    
    certbot certonly --standalone --agree-tos --email "$EMAIL" -d "$DOMAIN" -d "www.$DOMAIN"
    
    if [ $? -ne 0 ]; then
        echo "Error obtaining SSL certificates. Check logs at /var/log/letsencrypt/letsencrypt.log."
        exit 1
    fi
fi

# Configure Nginx for SSL
echo "Configuring Nginx to use SSL..."
cat <<EOF > /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN www.$DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }
}
EOF

# Validate Nginx configuration and reload
nginx -t
if [ $? -ne 0 ]; then
    echo "Nginx configuration test failed!"
    exit 1
fi

echo "Starting Nginx..."
nginx

# Set up cron job for automatic renewal
echo "Setting up automatic SSL certificate renewal..."
echo "0 0,12 * * * certbot renew --quiet && nginx -s reload" > /etc/crontabs/root

# Start cron service
echo "Starting cron service..."
crond -f
