---
title: Docker & Deployment
description: Deploy Scout Portal for FreeScout with Docker, Apache, or Nginx, and schedule the maintenance cleanup job.
order: 5
howTo:
  name: Deploy Scout Portal with Docker
  description: Run the self-hosted FreeScout portal in production.
  steps:
    - Build or pull the image using the provided Dockerfile.
    - Provide environment variables (FreeScout API, auth, CSRF secret).
    - Start the stack with docker compose up -d.
    - Schedule the cleanup script via cron for maintenance.
---

## Docker

The repository includes a `Dockerfile` and `docker-compose.yml` for containerized deployment. The image is based on `php:8.2-apache` and includes all required PHP extensions (`pdo`, `mbstring`, `ldap`, `gd`, `zip`, and more).

To start the stack:

```bash
docker compose up -d
```

The default `docker-compose.yml` maps port `8080` on the host to port `80` in the container and mounts persistent volumes for `data/`, `logs/`, `uploads/`, and `tmp/`. Your `.env` file is mounted read-only into the container.

Required environment variables (set in `.env` before starting):

- `FREESCOUT_API_URL` — Base URL for your FreeScout API
- `FREESCOUT_API_KEY` — API key from FreeScout Admin > Manage > API
- `FREESCOUT_MAILBOX_ID` — Numeric mailbox ID to submit tickets to
- `CSRF_SECRET` — Random secret; generate with `php -r "echo bin2hex(random_bytes(32));"`

See [Configuration](/scout-portal/docs/configuration) for the full list of environment variables.

## Apache

Point your `DocumentRoot` to the `public` directory:

```apache
<VirtualHost *:80>
    ServerName helpdesk.yourdomain.com
    DocumentRoot /var/www/html/public
    
    <Directory /var/www/html/public>
        AllowOverride All
        Require all granted
        
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^ index.php [QSA,L]
    </Directory>
    
    ErrorLog /var/log/apache2/helpdesk_error.log
    CustomLog /var/log/apache2/helpdesk_access.log combined
</VirtualHost>
```

Enable required modules:

```bash
sudo a2enmod rewrite headers
sudo systemctl restart apache2
```

## Nginx

```nginx
server {
    listen 80;
    server_name helpdesk.yourdomain.com;
    root /var/www/html/public;
    
    index index.php;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## Maintenance (cleanup cron)

Expired sessions/drafts, old uploads, stale temporary files, and expired caches are removed by a maintenance script. Schedule it (e.g. every 15 minutes) via cron:

```cron
*/15 * * * * php /var/www/html/bin/cleanup.php >> /var/www/html/logs/cleanup.log 2>&1
```
