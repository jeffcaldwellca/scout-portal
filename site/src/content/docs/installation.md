---
title: Installation
description: How to install Scout Portal for FreeScout — prerequisites, Composer, environment config, web server setup, and connecting the FreeScout API.
order: 2
howTo:
  name: Install Scout Portal for FreeScout
  description: Install and configure the self-hosted FreeScout customer portal.
  steps:
    - Clone the repository from GitHub.
    - Install PHP dependencies with Composer.
    - Copy .env.example to .env and configure FreeScout API, auth, and security settings.
    - Create the data, uploads, logs and cache directories and set permissions.
    - Point your web server (Apache or Nginx) document root at the public directory.
    - Install the FreeScout API module, generate an API key, and set the mailbox ID.
---

## Prerequisites

### Required

- **PHP 8.0+** with extensions:
  - `pdo_sqlite`
  - `ldap` (if using LDAP authentication)
  - `curl`
  - `json`
  - `mbstring`
  - `fileinfo`
- **Composer** — PHP dependency manager
- **Web Server** — Apache or Nginx
- **FreeScout Installation** with the **API Module** (required)

### FreeScout Modules

The following FreeScout modules are required or optional for full functionality:

#### Required Modules

- **API Module** — Enables REST API access for ticket creation and management
  - Without this module, the application cannot communicate with FreeScout
  - Available from the FreeScout Modules marketplace

#### Optional Modules (Enhance Functionality)

- **Custom Fields Module** — Allows mapping form fields to custom FreeScout fields
  - Enables structured data storage beyond the ticket body
  - Recommended for better ticket organization and reporting
- **Tags Module** — Supports automatic tagging of tickets by request type
  - Improves ticket categorization and filtering
  - Recommended for multi-team helpdesk operations

**Note:** The application will work with just the API module, but custom fields and tags will be ignored if those modules are not installed in FreeScout.

## 1. Clone the repository

```bash
git clone https://github.com/jeffcaldwellca/scout-portal.git
cd scout-portal
```

## 2. Install dependencies

```bash
composer install
```

## 3. Configure environment

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# FreeScout Integration (REQUIRED)
FREESCOUT_API_KEY=your_api_key_here
FREESCOUT_API_URL=https://your-freescout-instance.com/api
FREESCOUT_MAILBOX_ID=1

# Authentication
ENABLE_LDAP_AUTH=true
ENABLE_LOCAL_AUTH=false
DISABLE_AUTH=false

# LDAP Configuration (if ENABLE_LDAP_AUTH=true)
LDAP_HOST=ldap.yourdomain.com
LDAP_PORT=389
LDAP_ENCRYPTION=tls   # tls (StartTLS) | ssl (LDAPS) | none — defaults to tls
LDAP_BASE_DN=dc=yourdomain,dc=com
# ... (see .env.example for all options)

# Security (REQUIRED)
# The app refuses to start without a real CSRF_SECRET.
CSRF_SECRET=          # php -r "echo bin2hex(random_bytes(32));"
COOKIE_SECURE=true    # set to false only for local HTTP development

# Application
APP_DEBUG=false
APP_LOG_LEVEL=info
```

## 4. Set up database and directories

```bash
# Create necessary directories
mkdir -p data uploads logs tmp/cache

# Set permissions
chmod 755 data uploads logs tmp/cache
```

The SQLite database will be created automatically on first run.

## 5. Configure your web server

#### Apache

Point your DocumentRoot to the `public` directory:

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

#### Nginx

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

## 6. Configure FreeScout

1. **Install the API Module** in FreeScout (required)
2. Generate an API key in FreeScout: Settings → API
3. Add the API key to your `.env` file
4. **Set the Mailbox ID** — Find your mailbox ID in FreeScout: Manage → Mailboxes (the ID is visible in the URL when editing a mailbox, or via the API)
5. (Optional) Install Custom Fields and Tags modules to FreeScout for enhanced functionality
6. (Optional) Configure custom fields in FreeScout that match your form field names
