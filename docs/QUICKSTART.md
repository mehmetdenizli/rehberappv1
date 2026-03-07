# Quick Start Guide

Bu rehber, GeoGuide projesini 5 dakikada çalıştırmanıza yardımcı olacak.

## Ön Gereksinimler

Sisteminizde şunlar yüklü olmalı:
- Docker Desktop (veya Docker + Docker Compose)
- Git

## Adım 1: Projeyi İndirin

```bash
git clone https://github.com/mehmetdenizli/rehberappv1.git
cd rehberappv1
```

## Adım 2: Environment Ayarları

```bash
# .env dosyasını oluşturun
cp .env.example .env

# Varsayılan ayarlar development için yeterli
# Production için güçlü şifreler kullanın!
```

## Adım 3: Servisleri Başlatın

```bash
# Tüm servisleri Docker ile başlat
docker-compose up -d

# Logları izleyin (opsiyonel)
docker-compose logs -f
```

İlk başlatma 2-3 dakika sürebilir (image'lar indirilecek).

## Adım 4: Veritabanını Hazırlayın

```bash
# Backend container'ına girin
docker-compose exec backend sh

# Prisma migrasyonlarını çalıştırın
npx prisma migrate dev

# Container'dan çıkın
exit
```

## Adım 5: Uygulamayı Açın

Tarayıcınızda şu adresleri açın:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Docs**: http://localhost:3001/api/docs
- **MinIO Console**: http://localhost:9001

## Test Kullanıcısı Oluşturma

### API ile (Postman/cURL)

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "role": "GUIDE"
  }'
```

### Frontend ile

1. http://localhost:3000/auth/login sayfasına gidin
2. "Kayıt Ol" linkine tıklayın (henüz eklenmedi, API kullanın)
3. Formu doldurun ve kayıt olun

## Temel Kullanım

### Turist Olarak

1. Kayıt olun (role: "TOURIST")
2. Feed sayfasına gidin: http://localhost:3000/feed
3. Post oluşturun
4. Rotaları keşfedin: http://localhost:3000/routes

### Rehber Olarak

1. Kayıt olun (role: "GUIDE")
2. Dashboard'a gidin: http://localhost:3000/guide/dashboard
3. Yeni rota oluşturun: http://localhost:3000/guide/create-route
4. Rotalarınızı yönetin

## Sorun Giderme

### Port zaten kullanımda

```bash
# Çakışan servisleri durdurun veya portları değiştirin
# docker-compose.yml dosyasında port mapping'leri düzenleyin
```

### Container başlamıyor

```bash
# Logları kontrol edin
docker-compose logs [service-name]

# Servisleri yeniden başlatın
docker-compose restart

# Temiz başlangıç
docker-compose down -v
docker-compose up -d
```

### Database bağlantı hatası

```bash
# PostgreSQL'in hazır olmasını bekleyin
docker-compose exec postgres pg_isready

# Migrasyonları tekrar çalıştırın
docker-compose exec backend npx prisma migrate dev
```

## Makefile Komutları

Daha kolay kullanım için:

```bash
make up        # Servisleri başlat
make down      # Servisleri durdur
make logs      # Logları görüntüle
make clean     # Temizlik (volumes dahil)
make migrate   # Database migrasyonları
```

## Sonraki Adımlar

- [API Documentation](API.md) - API endpoint'lerini keşfedin
- [Architecture](ARCHITECTURE.md) - Sistem mimarisini öğrenin
- [Contributing](../CONTRIBUTING.md) - Katkıda bulunun

## Yardım

Sorun mu yaşıyorsunuz? 
- [GitHub Issues](https://github.com/mehmetdenizli/rehberappv1/issues)
- [Documentation](../README.md)
