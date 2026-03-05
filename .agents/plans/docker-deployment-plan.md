# Docker Deployment Plan -- VPS (Production Ready)

## Headless CMS + Vue/Nuxt SSG + PocketBase

------------------------------------------------------------------------

# 1. Target Production Architecture

-   Nginx (Reverse Proxy + SSL)
-   Docker Containers
    -   PocketBase
    -   CMS Dashboard
    -   Nuxt Site
-   SQLite Database (Persistent Volume)
-   File Storage Volume

Flow:

Internet → Nginx → Docker Containers → PocketBase → SQLite + Storage

------------------------------------------------------------------------

# 2. VPS Requirements

Minimum Recommended: - 2 vCPU - 4 GB RAM - 40+ GB SSD - Ubuntu 22.04 LTS

Install Dependencies:

sudo apt update sudo apt install docker.io docker-compose nginx certbot
python3-certbot-nginx

------------------------------------------------------------------------

# 3. Production Folder Structure

/opt/ophillia-hcms/ ├── docker-compose.yml ├── .env ├── pocketbase/ │ ├──
pb_data/ │ └── pocketbase ├── nginx/ │ └── default.conf └── backups/

------------------------------------------------------------------------

# 4. Docker Compose Configuration

version: "3.9"

services:

pocketbase: image: ghcr.io/muchobien/pocketbase:latest container_name:
pocketbase restart: always ports: - "8090:8090" volumes: -
./pocketbase/pb_data:/pb_data command: \["serve",
"--http=0.0.0.0:8090"\]

cms-dashboard: image: yourrepo/cms-dashboard:latest container_name:
cms-dashboard restart: always ports: - "3001:3000" env_file: - .env

nuxt-site: image: yourrepo/nuxt-site:latest container_name: nuxt-site
restart: always ports: - "3002:3000" env_file: - .env

------------------------------------------------------------------------

# 5. Nginx Reverse Proxy Configuration

server { server_name cms.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

}

server { server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

}

server { server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

}

Enable:

sudo ln -s /etc/nginx/sites-available/ophillia-hcms
/etc/nginx/sites-enabled/ sudo nginx -t sudo systemctl restart nginx

------------------------------------------------------------------------

# 6. SSL Setup (Let's Encrypt)

sudo certbot --nginx -d yourdomain.com -d cms.yourdomain.com -d
api.yourdomain.com

------------------------------------------------------------------------

# 7. Build & Push Docker Images

docker build -t yourrepo/cms-dashboard . docker push
yourrepo/cms-dashboard

docker build -t yourrepo/nuxt-site . docker push yourrepo/nuxt-site

------------------------------------------------------------------------

# 8. Deployment Steps on VPS

cd /opt/ophillia-hcms docker-compose pull docker-compose up -d

Verify:

docker ps

------------------------------------------------------------------------

# 9. Deployment Flow

Dev → GitHub → CI → Container Registry → VPS Pull → Docker Restart →
Nginx Serve

------------------------------------------------------------------------

# 10. Backup Strategy

Daily PocketBase Backup (Cron):

crontab -e

0 3 \* \* \* tar -czf /opt/ophillia-hcms/backups/pb\_\$(date +%F).tar.gz
/opt/ophillia-hcms/pocketbase/pb_data

------------------------------------------------------------------------

# 11. Rollback Procedure

docker-compose down docker-compose pull previous-tag docker-compose up
-d

If DB corrupted:

tar -xzf backup.tar.gz docker restart pocketbase

------------------------------------------------------------------------

# 12. Production Hardening

Firewall:

sudo ufw allow 80 sudo ufw allow 443 sudo ufw enable

Do NOT expose: - 8090 - 3001 - 3002

Only Nginx should be public.

------------------------------------------------------------------------

# 13. Optional Improvements

-   Add Cloudflare
-   Add Docker health checks
-   Add Watchtower
-   Add fail2ban
-   Migrate to Postgres in future
-   Add monitoring stack

------------------------------------------------------------------------

# Final Production Layout

Internet ↓ Cloudflare (optional) ↓ Nginx (SSL termination) ↓ Docker
containers ↓ PocketBase (SQLite + file storage)

------------------------------------------------------------------------

This deployment plan ensures a stable, secure, and production-ready
Docker setup on a VPS.
