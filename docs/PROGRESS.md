# GeoGuide Projesi Gelişim Süreci

Bu doküman, GeoGuide projesinin sıfırdan nasıl geliştirildiğini, karşılaşılan sorunları ve çözümlerini adım adım açıklar. Yazılım geliştirme konusunda deneyimi olmayan kişiler için hazırlanmıştır.

---

## İçindekiler
1. [Proje Hakkında](#proje-hakkında)
2. [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
3. [Geliştirme Aşamaları](#geliştirme-aşamaları)
4. [Karşılaşılan Sorunlar ve Çözümler](#karşılaşılan-sorunlar-ve-çözümler)
5. [Önemli Komutlar](#önemli-komutlar)

---

## Proje Hakkında

**GeoGuide**, turist rehberleri ve turistleri bir araya getiren sosyal bir platformdur. Rehberler rotalar oluşturabilir, turistler bu rotaları keşfedebilir ve satın alabilir.

### Temel Özellikler:
- Kullanıcı kayıt ve giriş sistemi (Rehber/Turist)
- Sosyal medya benzeri haber akışı
- Rota oluşturma ve keşfetme
- Rehber profil yönetimi
- Fiyatlandırma ve satış sistemi

---

## Kullanılan Teknolojiler

### 1. **Docker** 🐳
**Ne işe yarar?** Uygulamanızı ve tüm bağımlılıklarını bir "konteyner" içinde çalıştırır. Böylece "benim bilgisayarımda çalışıyor" sorunları ortadan kalkar.

**Neden kullandık?**
- Tüm ekip üyeleri aynı ortamda çalışır
- Kurulum çok kolay (tek komutla her şey hazır)
- Veritabanı, backend, frontend ayrı konteynerlerde çalışır

**Temel Kavramlar:**
- **Container (Konteyner):** Uygulamanızın çalıştığı izole ortam
- **Image (İmaj):** Konteyner oluşturmak için kullanılan şablon
- **Volume (Hacim):** Verilerin kalıcı olarak saklandığı yer
- **docker-compose:** Birden fazla konteyneri yöneten araç

### 2. **Backend: NestJS** 🚀
**Ne işe yarar?** Sunucu tarafı uygulaması. Veritabanı işlemleri, kullanıcı doğrulama, API endpoint'leri burada.

**Neden NestJS?**
- TypeScript desteği (tip güvenliği)
- Modüler yapı (kod düzenli ve bakımı kolay)
- Swagger entegrasyonu (API dokümantasyonu otomatik)

**Kullandığımız Modüller:**
- **Auth Module:** Kullanıcı kayıt/giriş
- **Users Module:** Kullanıcı yönetimi
- **Posts Module:** Sosyal medya paylaşımları
- **Prisma Module:** Veritabanı işlemleri

### 3. **Frontend: Next.js 14** ⚛️
**Ne işe yarar?** Kullanıcıların gördüğü arayüz. React tabanlı modern bir framework.

**Neden Next.js?**
- App Router (modern sayfa yönetimi)
- Server-side rendering (SEO için önemli)
- Otomatik kod bölme (hızlı yükleme)

**Kullandığımız Kütüphaneler:**
- **Tailwind CSS:** Hızlı ve modern stil yazımı
- **Zustand:** Basit state yönetimi
- **Axios:** API istekleri için

### 4. **Veritabanı: PostgreSQL** 🗄️
**Ne işe yarar?** Tüm verileri saklar (kullanıcılar, rotalar, yorumlar vb.)

**Neden PostgreSQL?**
- Güçlü ve güvenilir
- İlişkisel veri yapısı
- JSON desteği

**ORM: Prisma**
- Veritabanı işlemlerini kolaylaştırır
- TypeScript desteği
- Otomatik migration (şema değişikliklerini yönetir)

### 5. **Diğer Servisler**
- **Redis:** Önbellek (cache) için - hızlı veri erişimi
- **MinIO:** Dosya depolama (resim, video)
- **Nginx:** Reverse proxy (trafiği yönlendirir)

---

## Geliştirme Aşamaları

### AŞAMA 1: Proje Altyapısının Kurulması
**Tarih:** İlk gün

**Yapılanlar:**
1. GitHub repository oluşturuldu
2. Docker Compose yapılandırması hazırlandı
3. Backend (NestJS) projesi oluşturuldu
4. Frontend (Next.js) projesi oluşturuldu
5. PostgreSQL, Redis, MinIO servisleri eklendi

**Kullanılan Komutlar:**
```bash
# Git repository başlatma
git init
git remote add origin https://github.com/mehmetdenizli/rehberappv1.git

# Docker konteynerlerini başlatma
docker-compose up -d

# Konteyner durumunu kontrol etme
docker-compose ps

# Logları görüntüleme
docker logs geoguide-backend
docker logs geoguide-frontend
```

**Oluşturulan Dosyalar:**
- `docker-compose.yml` - Tüm servislerin tanımı
- `backend/` - NestJS uygulaması
- `frontend/` - Next.js uygulaması
- `docs/` - Dokümantasyon klasörü

---

### AŞAMA 2: Veritabanı Şeması ve Backend API
**Tarih:** İlk gün

**Yapılanlar:**
1. Prisma şeması oluşturuldu (`schema.prisma`)
2. Veritabanı modelleri tanımlandı:
   - User (Kullanıcı)
   - Post (Paylaşım)
   - Comment (Yorum)
   - Route (Rota)
   - Follow (Takip)
3. Auth, Users, Posts modülleri geliştirildi
4. JWT authentication eklendi

**Prisma Komutları:**
```bash
# Prisma client oluşturma
npx prisma generate

# Veritabanı migration oluşturma
npx prisma migrate dev --name init

# Prisma Studio (veritabanı görselleştirme)
npx prisma studio
```

**API Endpoint'leri:**
- `POST /api/auth/register` - Kayıt ol
- `POST /api/auth/login` - Giriş yap
- `GET /api/users/profile` - Profil bilgisi
- `GET /api/posts` - Paylaşımları listele
- `POST /api/posts` - Yeni paylaşım

**Swagger Dokümantasyonu:**
http://localhost:3001/api/docs

---

### AŞAMA 3: Frontend Sayfalarının Oluşturulması
**Tarih:** İkinci gün

**Yapılanlar:**
1. Tüm sayfalar oluşturuldu:
   - Ana sayfa (landing page)
   - Giriş sayfası
   - Kayıt sayfası
   - Haber akışı (feed)
   - Rotalar sayfası
   - Rehber dashboard
   - Rota oluşturma sayfası

2. Componentler geliştirildi:
   - Navbar (üst menü)
   - Footer (alt bilgi)
   - PostCard (paylaşım kartı)
   - RouteCard (rota kartı)
   - CreatePost (paylaşım oluşturma)

3. API entegrasyonu yapıldı:
   - Axios konfigürasyonu
   - Auth store (Zustand)
   - Token yönetimi

**Frontend Komutları:**
```bash
# Frontend container'a giriş
docker exec -it geoguide-frontend sh

# Bağımlılıkları yükleme
npm install

# Development server başlatma
npm run dev

# Production build
npm run build
```

---

### AŞAMA 4: Modern UI Tasarımı
**Tarih:** Üçüncü gün

**Yapılanlar:**
1. Yolcu360'dan ilham alınarak modern tasarım
2. Gradient arka planlar
3. Animasyonlu kartlar
4. Responsive tasarım (mobil uyumlu)
5. Tailwind CSS özelleştirmesi

**Tasarım Özellikleri:**
- Renk paleti: Mavi tonları (primary)
- Yuvarlatılmış köşeler (rounded-2xl)
- Gölge efektleri (shadow-lg)
- Hover animasyonları
- Wave divider (dalga ayırıcı)

**Tailwind Konfigürasyonu:**
```javascript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        // ... diğer tonlar
      }
    }
  }
}
```

---

### AŞAMA 5: Test Verilerinin Oluşturulması
**Tarih:** Dördüncü gün

**Yapılanlar:**
1. Seed script yazıldı (`backend/prisma/seed.ts`)
2. 5 rehber kullanıcısı oluşturuldu
3. 5 turist kullanıcısı oluşturuldu
4. 15 rota eklendi
5. Her rota için detaylı bilgiler

**Seed Komutları:**
```bash
# Prisma seed çalıştırma
docker exec geoguide-backend npx prisma db seed

# API üzerinden seed (alternatif)
bash scripts/seed-via-api.sh
```

**Test Kullanıcıları:**
- Rehberler: ahmet.yilmaz@example.com, zeynep.kaya@example.com, vb.
- Turistler: ali@example.com, elif@example.com, vb.
- Tüm şifreler: `password123`

---

### AŞAMA 6: OpenSSL Uyumluluk Sorunu
**Tarih:** Beşinci gün

**SORUN:**
```
Error: PrismaClient failed to initialize
Prisma Client could not locate the Query Engine for runtime "linux-musl"
```

**Neden Oluştu?**
- Docker Alpine Linux kullanıyor (hafif Linux dağıtımı)
- Alpine, musl libc kullanır (glibc yerine)
- Prisma, OpenSSL 3.0 gerektirir

**ÇÖZÜM:**
1. Dockerfile'a OpenSSL eklendi:
```dockerfile
RUN apk add --no-cache openssl
```

2. Prisma şemasına binary target eklendi:
```prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}
```

3. Container yeniden build edildi:
```bash
docker-compose down
docker-compose build backend
docker-compose up -d
```

4. Migration tekrar çalıştırıldı:
```bash
docker exec geoguide-backend npx prisma migrate deploy
```

**Öğrenilen:**
- Docker image seçimi önemli
- Binary uyumluluğu kontrol edilmeli
- Alpine Linux hafif ama ek paketler gerekebilir

---

### AŞAMA 7: Frontend Login Sorunu (404 Error)
**Tarih:** Altıncı gün

**SORUN:**
```
Request URL: http://localhost:3001/auth/login
Status Code: 404 Not Found
```

**Neden Oluştu?**
- Backend'de global prefix var: `/api`
- Frontend API URL'i yanlış: `http://localhost:3001`
- Doğru olması gereken: `http://localhost:3001/api`

**Hata Analizi:**
1. Backend endpoint'i: `/api/auth/login`
2. Frontend istek: `/auth/login` (eksik `/api`)
3. Sonuç: 404 Not Found

**ÇÖZÜM 1: docker-compose.yml güncellendi**
```yaml
frontend:
  environment:
    NEXT_PUBLIC_API_URL: http://localhost:3001/api  # /api eklendi
```

**ÇÖZÜM 2: .env.local oluşturuldu**
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**ÇÖZÜM 3: Error handling iyileştirildi**
```typescript
// login/page.tsx
catch (err: any) {
  console.error('Login error:', err);
  const errorMessage = err.response?.data?.message || 
                       err.message || 
                       'Giriş başarısız';
  setError(errorMessage);
}
```

**ÇÖZÜM 4: Frontend cache temizlendi**
```bash
# .next klasörünü silme
rm -rf frontend/.next

# Container'ı yeniden başlatma
docker-compose restart frontend
```

**Öğrenilen:**
- Environment variable'lar dikkatli ayarlanmalı
- API endpoint'leri test edilmeli
- Browser cache sorun çıkarabilir
- Next.js client-side env variable'ları build time'da embed eder

**Debug Adımları:**
1. Browser console'u kontrol et (F12)
2. Network tab'ında request URL'i gör
3. Backend loglarını kontrol et: `docker logs geoguide-backend`
4. API'yi curl ile test et:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ahmet.yilmaz@example.com","password":"password123"}'
```

---

## Karşılaşılan Sorunlar ve Çözümler

### 1. Docker Container Başlamıyor

**Belirtiler:**
- `docker-compose up` hata veriyor
- Container sürekli restart oluyor

**Çözüm Adımları:**
```bash
# Logları kontrol et
docker-compose logs [servis-adı]

# Container'ı yeniden build et
docker-compose build --no-cache [servis-adı]

# Tüm container'ları temizle ve baştan başla
docker-compose down -v
docker-compose up -d
```

### 2. Port Zaten Kullanımda

**Hata:**
```
Error: bind: address already in use
```

**Çözüm:**
```bash
# Hangi process portu kullanıyor?
lsof -i :3000  # veya :3001, :5432 vb.

# Process'i durdur
kill -9 [PID]

# Veya docker-compose'da portu değiştir
ports:
  - "3002:3000"  # Host:Container
```

### 3. Veritabanı Bağlantı Hatası

**Hata:**
```
Error: Can't reach database server
```

**Çözüm:**
```bash
# PostgreSQL container'ı çalışıyor mu?
docker-compose ps postgres

# Health check
docker exec geoguide-postgres pg_isready -U geoguide_user

# Connection string doğru mu?
DATABASE_URL=postgresql://geoguide_user:changeme123@postgres:5432/geoguide
```

### 4. CORS Hatası

**Hata:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Çözüm:**
```typescript
// backend/src/main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});
```

### 5. Environment Variable Tanınmıyor

**Sorun:**
- `.env` dosyası var ama değişkenler yüklenmiyor

**Çözüm:**
```bash
# Next.js için NEXT_PUBLIC_ prefix gerekli
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Container'ı restart et
docker-compose restart frontend

# .next cache'ini temizle
rm -rf frontend/.next
```

---

## Önemli Komutlar

### Docker Komutları

```bash
# Tüm servisleri başlat
docker-compose up -d

# Belirli bir servisi başlat
docker-compose up -d backend

# Servisleri durdur
docker-compose down

# Servisleri durdur ve volume'leri sil
docker-compose down -v

# Logları görüntüle
docker-compose logs -f [servis-adı]

# Container'a giriş yap
docker exec -it geoguide-backend sh

# Container durumunu kontrol et
docker-compose ps

# Yeniden build et
docker-compose build --no-cache

# Restart
docker-compose restart [servis-adı]
```

### Git Komutları

```bash
# Değişiklikleri stage'e al
git add .

# Commit oluştur
git commit -m "Açıklama mesajı"

# GitHub'a push et
git push origin main

# Durumu kontrol et
git status

# Değişiklikleri gör
git diff

# Commit geçmişi
git log --oneline

# Branch oluştur
git checkout -b yeni-branch

# Branch'ler arası geçiş
git checkout main
```

### Prisma Komutları

```bash
# Container içinde çalıştır
docker exec geoguide-backend [komut]

# Migration oluştur
npx prisma migrate dev --name migration_adi

# Migration uygula (production)
npx prisma migrate deploy

# Prisma client oluştur
npx prisma generate

# Veritabanını sıfırla
npx prisma migrate reset

# Seed çalıştır
npx prisma db seed

# Prisma Studio aç
npx prisma studio
```

### NPM Komutları

```bash
# Bağımlılıkları yükle
npm install

# Paket ekle
npm install paket-adi

# Dev dependency ekle
npm install -D paket-adi

# Development server
npm run dev

# Production build
npm run build

# Production server
npm start

# Testleri çalıştır
npm test
```

### Debugging Komutları

```bash
# API test et
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Port kontrolü
lsof -i :3000

# Container içindeki dosyaları listele
docker exec geoguide-frontend ls -la /app

# Environment variable'ları gör
docker exec geoguide-frontend printenv

# Veritabanına bağlan
docker exec -it geoguide-postgres psql -U geoguide_user -d geoguide

# Redis'e bağlan
docker exec -it geoguide-redis redis-cli
```

---

## Proje Yapısı

```
rehberappv1/
├── backend/                    # NestJS Backend
│   ├── src/
│   │   ├── auth/              # Authentication modülü
│   │   ├── users/             # Kullanıcı modülü
│   │   ├── posts/             # Paylaşım modülü
│   │   ├── prisma/            # Prisma servis
│   │   └── main.ts            # Uygulama giriş noktası
│   ├── prisma/
│   │   ├── schema.prisma      # Veritabanı şeması
│   │   ├── seed.ts            # Test verileri
│   │   └── migrations/        # Veritabanı migration'ları
│   ├── Dockerfile             # Backend Docker image
│   └── package.json           # Backend bağımlılıkları
│
├── frontend/                   # Next.js Frontend
│   ├── src/
│   │   ├── app/               # Next.js App Router
│   │   │   ├── auth/          # Giriş/Kayıt sayfaları
│   │   │   ├── feed/          # Haber akışı
│   │   │   ├── routes/        # Rotalar
│   │   │   └── guide/         # Rehber dashboard
│   │   ├── components/        # React componentleri
│   │   ├── lib/               # Yardımcı fonksiyonlar
│   │   └── store/             # State yönetimi (Zustand)
│   ├── Dockerfile             # Frontend Docker image
│   ├── tailwind.config.ts     # Tailwind CSS ayarları
│   └── package.json           # Frontend bağımlılıkları
│
├── docs/                       # Dokümantasyon
│   ├── PROGRESS.md            # Bu dosya
│   ├── API.md                 # API dokümantasyonu
│   ├── ARCHITECTURE.md        # Mimari açıklaması
│   ├── DEPLOYMENT.md          # Deployment rehberi
│   └── LOGIN_TEST.md          # Test kullanıcıları
│
├── docker/                     # Docker konfigürasyonları
│   └── nginx/
│       └── nginx.conf         # Nginx ayarları
│
├── scripts/                    # Yardımcı scriptler
│   └── seed-via-api.sh        # API ile seed
│
├── docker-compose.yml          # Docker Compose konfigürasyonu
├── .gitignore                 # Git ignore kuralları
└── README.md                  # Proje README
```

---

## Sonraki Adımlar

### Planlanan Özellikler:
1. ✅ Kullanıcı authentication
2. ✅ Sosyal medya feed
3. ✅ Rota oluşturma
4. ⏳ Ödeme sistemi entegrasyonu
5. ⏳ Harita entegrasyonu (Google Maps/Mapbox)
6. ⏳ Gerçek zamanlı bildirimler
7. ⏳ Mesajlaşma sistemi
8. ⏳ Dosya yükleme (MinIO entegrasyonu)
9. ⏳ Email doğrulama
10. ⏳ Production deployment

### Öğrenme Kaynakları:
- **Docker:** https://docs.docker.com/get-started/
- **NestJS:** https://docs.nestjs.com/
- **Next.js:** https://nextjs.org/docs
- **Prisma:** https://www.prisma.io/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## Sık Sorulan Sorular

### Docker nedir ve neden kullanıyoruz?
Docker, uygulamanızı ve tüm bağımlılıklarını bir "konteyner" içinde paketler. Bu sayede "benim bilgisayarımda çalışıyor ama seninkinde çalışmıyor" sorunu ortadan kalkar.

### Neden TypeScript kullanıyoruz?
TypeScript, JavaScript'e tip güvenliği ekler. Hataları kod yazarken yakalar, IDE desteği sunar ve kodun okunabilirliğini artırır.

### Prisma nedir?
Prisma, veritabanı işlemlerini kolaylaştıran bir ORM (Object-Relational Mapping) aracıdır. SQL yazmak yerine TypeScript kodu yazarsınız.

### Next.js'te App Router nedir?
Next.js 13+ ile gelen yeni routing sistemi. Klasör yapısı ile sayfa oluşturursunuz, daha modern ve güçlü.

### Environment variable nedir?
Ortama göre değişen ayarlar (API URL, şifreler vb.). `.env` dosyasında saklanır ve kod içine yazılmaz.

---

**Son Güncelleme:** 8 Mart 2026
**Versiyon:** 1.0.0
**Hazırlayan:** GeoGuide Development Team


---

### AŞAMA 8: Proje Yönetimi ve Dokümantasyon
**Tarih:** 8 Mart 2026

**Yapılanlar:**
1. **PROGRESS.md** oluşturuldu
   - Tüm geliştirme süreci dokümante edildi
   - Teknolojiler detaylı açıklandı
   - Karşılaşılan hatalar ve çözümleri eklendi
   - Önemli komutlar referansı
   - Yazılımcı olmayan kişiler için hazırlandı

2. **TODO.md** oluşturuldu
   - 21 ana görev kategorize edildi
   - Öncelik seviyeleri belirlendi (Kritik/Orta/Düşük)
   - Sprint planlaması yapıldı
   - Gelecek fikirler bölümü eklendi
   - V2 özellikleri ayrıldı

3. **Proje Kararları:**
   - ✅ Login başarıyla test edildi
   - Satın alma ve fiyatlandırma V2'ye ertelendi
   - İlk versiyon ücretsiz rota paylaşımı olacak
   - Monetizasyon sonraki sürümde eklenecek

**Oluşturulan Dosyalar:**
- `docs/PROGRESS.md` - Geliştirme süreci dokümantasyonu
- `docs/LOGIN_TEST.md` - Test kullanıcıları ve troubleshooting
- `TODO.md` - Yapılacaklar listesi ve proje yönetimi

**Git Commit'leri:**
```bash
git commit -m "Add comprehensive PROGRESS.md documentation"
git commit -m "Add comprehensive TODO.md for project tracking"
git commit -m "Update TODO: Mark login as complete, move payment to V2"
```

**Sonraki Sprint:**
Sprint 1'e hazırız - Feed ve Routes modüllerini tamamlayacağız.

---

## 📊 Proje Durumu Özeti

### ✅ Tamamlanan Özellikler (V1.0 - MVP)
- Docker altyapısı
- Backend API (NestJS + Prisma)
- Frontend (Next.js 14)
- Authentication (JWT)
- Modern UI tasarımı
- Test verileri (seed)
- Dokümantasyon

### 🚧 Devam Eden Çalışmalar
- Feed (Haber Akışı) modülü
- Routes (Rotalar) modülü
- Navbar component

### ⏳ Planlanan Özellikler (V1.0)
- Profil sayfaları
- Takip sistemi
- Arama ve filtreleme
- Yorum ve beğeni sistemi

### 🔮 Gelecek Sürümler (V2.0+)
- Ödeme sistemi
- Rota satın alma
- Kazanç yönetimi
- Premium özellikler

---

**Son Güncelleme:** 8 Mart 2026, 16:00
**Versiyon:** 1.0.0-alpha
**Hazırlayan:** GeoGuide Development Team
