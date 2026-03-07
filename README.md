# GeoGuide Social Platform

Modern, ölçeklenebilir bir rehber-turist sosyal platformu.

## 🎯 Özellikler

- **Sosyal Medya Motoru**: Dinamik haber akışı, video/fotoğraf paylaşımı
- **Rehber Paneli**: İnteraktif rota oluşturucu, medya yönetimi, gelir sistemi
- **Keşif Servisi**: Bölge, puan, fiyat ve kategoriye göre arama

## 🏗️ Teknoloji Stack

- **Frontend**: Next.js 14+ (App Router), Tailwind CSS, Shadcn UI
- **Backend**: NestJS, Prisma ORM, PostgreSQL
- **Altyapı**: Docker, Redis, MinIO/S3, Nginx

## 🚀 Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/mehmetdenizli/rehberappv1.git
cd rehberappv1

# Docker ile başlatın
docker-compose up -d
```

## 📦 Modüller

- `frontend/` - Next.js uygulaması
- `backend/` - NestJS API servisi
- `docker/` - Docker yapılandırmaları

## 👥 Kullanıcı Rolleri

- **TOURIST**: İçerik görüntüleme, yorum yapma, rota satın alma
- **GUIDE**: Rota oluşturma, medya yükleme, fiyatlandırma
- **VERIFIED_GUIDE**: Öncelikli listeleme, doğrulanmış rozet

## 📄 Lisans

MIT
