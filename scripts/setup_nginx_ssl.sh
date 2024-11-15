#!/bin/bash

# Ensure necessary directories exist
mkdir -p /etc/nginx/conf.d
mkdir -p /etc/letsencrypt/live

# Check if DOMAIN and EMAIL environment variables are available
if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
  echo "DOMAIN or EMAIL is not set, exiting..."
  exit 1
fi

# Install Certbot if not already installed
echo "Installing Certbot..."
apk --no-cache add certbot

# Check if the SSL certificates are already present
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "Obtaining SSL certificates from Let's Encrypt..."
    
    # Run Certbot to obtain SSL certificates
    certbot certonly --standalone --agree-tos --email "$EMAIL" -d "$DOMAIN" -d "www.$DOMAIN"
    
    # Check if certbot was successful
    if [ $? -ne 0 ]; then
        echo "Error obtaining SSL certificates from Let's Encrypt!"
        exit 1
    fi
fi

# Configure Nginx to use SSL certificates
echo "Configuring Nginx to use SSL..."

# Create Nginx configuration for SSL
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

# Reload Nginx to apply the new SSL configuration
echo "Reloading Nginx..."
nginx -s reload

# Set up cron job for automatic certificate renewal
echo "Setting up automatic SSL certificate renewal..."
echo "0 0,12 * * * certbot renew --quiet && nginx -s reload" > /etc/crontabs/root

# Start the cron service to handle automatic renewal
crond
