# Katkıda Bulunma Rehberi

GeoGuide projesine katkıda bulunmak istediğiniz için teşekkürler!

## Geliştirme Ortamı Kurulumu

1. Repoyu klonlayın:
```bash
git clone https://github.com/mehmetdenizli/rehberappv1.git
cd rehberappv1
```

2. Docker ile servisleri başlatın:
```bash
docker-compose up -d
```

3. Veritabanı migrasyonlarını çalıştırın:
```bash
cd backend
npx prisma migrate dev
```

## Proje Yapısı

```
├── backend/          # NestJS API
│   ├── src/
│   │   ├── auth/     # Authentication
│   │   ├── users/    # User management
│   │   ├── posts/    # Social posts
│   │   └── routes/   # Travel routes
│   └── prisma/       # Database schema
├── frontend/         # Next.js App
│   └── src/
│       ├── app/      # Pages
│       ├── components/ # React components
│       └── store/    # State management
└── docker/           # Docker configs
```

## Commit Mesajları

Conventional Commits formatını kullanıyoruz:

- `feat:` Yeni özellik
- `fix:` Hata düzeltme
- `docs:` Dokümantasyon
- `style:` Kod formatı
- `refactor:` Kod iyileştirme
- `test:` Test ekleme
- `chore:` Genel işler

Örnek:
```
feat: Add route filtering by region
fix: Resolve authentication token expiry issue
```

## Pull Request Süreci

1. Feature branch oluşturun: `git checkout -b feature/amazing-feature`
2. Değişikliklerinizi commit edin: `git commit -m 'feat: Add amazing feature'`
3. Branch'i push edin: `git push origin feature/amazing-feature`
4. Pull Request açın

## Kod Standartları

- TypeScript kullanın
- ESLint kurallarına uyun
- Anlamlı değişken isimleri kullanın
- Fonksiyonları küçük ve odaklı tutun
- Yorum satırları ekleyin (gerektiğinde)

## Test

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## Sorular?

Herhangi bir sorunuz varsa issue açabilirsiniz.
