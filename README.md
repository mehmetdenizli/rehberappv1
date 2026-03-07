# GeoGuide Social Platform

Modern, ölçeklenebilir bir rehber-turist sosyal platformu. Yerel rehberlerle turistleri buluşturan, rota paylaşımı ve sosyal etkileşim odaklı bir platform.

## 🎯 Özellikler

### Sosyal Medya Motoru
- Dinamik haber akışı (Facebook tarzı)
- Video/fotoğraf paylaşımı
- Yorum sistemi ve etkileşim
- Takip sistemi

### Rehber Paneli
- İnteraktif rota oluşturucu (GeoJSON/Harita entegrasyonu)
- Medya yönetimi (S3/MinIO)
- Gelir sistemi (Rota/kanal fiyatlandırması)
- Kişisel profil yönetimi

### Keşif Servisi
- Bölge, puan, fiyat ve kategoriye göre arama
- Gelişmiş filtreleme
- Doğrulanmış rehber rozetleri

## 🏗️ Teknoloji Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Design Pattern**: Atomic Design

### Backend
- **Framework**: NestJS
- **API**: RESTful with Swagger/OpenAPI
- **ORM**: Prisma
- **Authentication**: JWT with Refresh Tokens & RBAC

### Infrastructure
- **Orchestration**: Docker Compose
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **Object Storage**: MinIO
- **Gateway**: Nginx

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Docker & Docker Compose
- Node.js 20+ (local development için)

### Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/mehmetdenizli/rehberappv1.git
cd rehberappv1

# Environment dosyasını oluşturun
cp .env.example .env

# Docker ile tüm servisleri başlatın
docker-compose up -d

# Veritabanı migrasyonlarını çalıştırın
cd backend
npx prisma migrate dev
```

### Erişim

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Docs**: http://localhost:3001/api/docs
- **MinIO Console**: http://localhost:9001

### Makefile Komutları

```bash
make up        # Servisleri başlat
make down      # Servisleri durdur
make logs      # Logları görüntüle
make clean     # Temizlik yap
make install   # Bağımlılıkları yükle
make migrate   # Veritabanı migrasyonları
```

## 📦 Proje Yapısı

```
├── backend/              # NestJS API
│   ├── src/
│   │   ├── auth/        # Authentication
│   │   ├── users/       # User management
│   │   ├── posts/       # Social posts
│   │   ├── routes/      # Travel routes
│   │   └── prisma/      # Database service
│   └── prisma/          # Database schema
├── frontend/            # Next.js App
│   └── src/
│       ├── app/         # Pages (App Router)
│       ├── components/  # React components
│       ├── store/       # Zustand stores
│       └── lib/         # Utilities
├── docker/              # Docker configs
│   └── nginx/          # Nginx configuration
└── docs/               # Documentation
    ├── API.md          # API documentation
    ├── ARCHITECTURE.md # Architecture details
    └── DEPLOYMENT.md   # Deployment guide
```

## 👥 Kullanıcı Rolleri

| Role | Permissions |
|------|-------------|
| **TOURIST** | İçerik görüntüleme, yorum yapma, rota satın alma, rehber takibi |
| **GUIDE** | Rota oluşturma, medya yükleme, fiyatlandırma, profil yönetimi |
| **VERIFIED_GUIDE** | Öncelikli listeleme, doğrulanmış rozet, gelişmiş analitik |

## 📚 Dokümantasyon

- [API Documentation](docs/API.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guide](CONTRIBUTING.md)

## 🧪 Test

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını okuyun.

## 📝 Lisans

MIT License - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🔗 Bağlantılar

- [GitHub Repository](https://github.com/mehmetdenizli/rehberappv1)
- [Issue Tracker](https://github.com/mehmetdenizli/rehberappv1/issues)

## 📧 İletişim

Sorularınız için issue açabilirsiniz.
