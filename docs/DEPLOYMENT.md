# Deployment Guide

## Production Deployment

### Prerequisites

- Docker & Docker Compose
- Domain name
- SSL certificate (Let's Encrypt recommended)

### Environment Variables

Production ortamında `.env` dosyasını oluşturun:

```bash
# Database
DB_PASSWORD=strong_production_password

# JWT
JWT_SECRET=very_strong_random_secret_key
JWT_REFRESH_SECRET=another_strong_random_secret_key

# MinIO
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=strong_minio_password

# Application
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com
```

### Build & Deploy

```bash
# Build production images
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Run migrations
docker-compose exec backend npx prisma migrate deploy
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}
```

### Database Backup

```bash
# Backup
docker-compose exec postgres pg_dump -U geoguide_user geoguide > backup.sql

# Restore
docker-compose exec -T postgres psql -U geoguide_user geoguide < backup.sql
```

### Monitoring

Önerilen araçlar:
- **Logs**: Docker logs veya ELK Stack
- **Metrics**: Prometheus + Grafana
- **Uptime**: UptimeRobot veya Pingdom
- **Error Tracking**: Sentry

### Scaling

Horizontal scaling için:

```yaml
# docker-compose.prod.yml
services:
  backend:
    deploy:
      replicas: 3
      
  frontend:
    deploy:
      replicas: 2
```

### Security Checklist

- [ ] Güçlü şifreler kullanın
- [ ] SSL/TLS aktif
- [ ] Firewall yapılandırması
- [ ] Rate limiting
- [ ] CORS ayarları
- [ ] Database backup stratejisi
- [ ] Log monitoring
- [ ] Güvenlik güncellemeleri
