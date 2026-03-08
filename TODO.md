# GeoGuide - Yapılacaklar Listesi

Bu dosya, projenin eksik özelliklerini, gelecek geliştirmeleri ve iyileştirmeleri takip etmek için kullanılır.

**Son Güncelleme:** 8 Mart 2026

---

## 🔴 KRİTİK - Acil Yapılması Gerekenler

### 1. Login Sorunu Testi ✅ TAMAMLANDI
- [x] Frontend login sayfasını test et
- [x] Browser console hatalarını kontrol et
- [x] API endpoint'inin doğru çağrıldığını doğrula
- [x] Token'ın localStorage'a kaydedildiğini kontrol et
- [x] Login sonrası yönlendirmenin çalıştığını test et

**Notlar:**
- Test kullanıcısı: `ahmet.yilmaz@example.com` / `password123`
- Beklenen endpoint: `POST http://localhost:3001/api/auth/login`
- ✅ Başarıyla tamamlandı - 8 Mart 2026

---

### 2. Feed (Haber Akışı) Sayfası ✅ TAMAMLANDI
**Durum:** Tamamlandı - 8 Mart 2026

**Backend Yapılacaklar:**
- [x] Posts controller'ı tamamla
  - [x] `GET /api/posts/feed` - Tüm postları listele
  - [x] `POST /api/posts` - Yeni post oluştur
  - [x] `GET /api/posts/:id` - Post detayı
- [x] Posts service'i tamamla
  - [x] Pagination ekle (sayfa sayfa yükleme) - 50 post limit
  - [x] User bilgilerini join et
  - [x] Sıralama (en yeni önce)
- [x] Comment (yorum) sistemi
  - [x] `POST /api/posts/:id/comment` - Yorum ekle
  - [x] Yorumları post ile birlikte getir
- [x] Like (beğeni) sistemi
  - [x] `POST /api/posts/:id/like` - Beğen/beğeniyi kaldır (toggle)
  - [x] Beğeni sayısını göster
  - [x] Kullanıcının beğenip beğenmediğini kontrol et

**Frontend Yapılacaklar:**
- [x] API entegrasyonunu tamamla
- [x] Post oluşturma formunu çalışır hale getir
- [x] Yorum ekleme özelliği
- [x] Beğeni butonu (interaktif)
- [x] Yorum bölümü (açılır/kapanır)
- [x] Real-time güncelleme
- [ ] Infinite scroll (sonsuz kaydırma) → V1.1'e ertelendi
- [ ] Resim yükleme (MinIO entegrasyonu) → V1.2'ye ertelendi

**Öncelik:** ✅ Tamamlandı

---

### 3. Routes (Rotalar) Modülü
**Durum:** Backend eksik, frontend kısmen hazır

**Backend Yapılacaklar:**
- [ ] Routes modülü oluştur
  - [ ] `GET /api/routes` - Tüm rotaları listele
  - [ ] `GET /api/routes/:id` - Rota detayı
  - [ ] `POST /api/routes` - Yeni rota oluştur (sadece rehberler)
  - [ ] `PUT /api/routes/:id` - Rota güncelle
  - [ ] `DELETE /api/routes/:id` - Rota sil
- [ ] Filtreleme ve arama
  - [ ] Bölgeye göre filtrele
  - [ ] Fiyata göre filtrele
  - [ ] Rating'e göre sırala
  - [ ] Rehbere göre filtrele
- [ ] ~~Rota satın alma~~ → V2'ye ertelendi
  - [ ] ~~`POST /api/routes/:id/purchase` - Rota satın al~~
  - [ ] ~~Satın alma geçmişi~~

**Frontend Yapılacaklar:**
- [ ] `/routes` sayfasını tamamla
- [ ] `/routes/[id]` detay sayfası
- [ ] Filtreleme UI'ı
- [ ] Arama çubuğu entegrasyonu
- [ ] ~~Satın alma butonu ve modal~~ → V2'ye ertelendi
- [ ] Harita görünümü (Google Maps/Mapbox)

**Öncelik:** 🔴 Yüksek

---

### 4. Navbar Component
**Durum:** Eksik veya hatalı

**Yapılacaklar:**
- [ ] Navbar component'ini kontrol et ve düzelt
- [ ] Kullanıcı menüsü (dropdown)
  - [ ] Profil linki
  - [ ] Ayarlar
  - [ ] Çıkış yap
- [ ] Giriş yapmamış kullanıcılar için farklı menü
- [ ] Responsive tasarım (mobil menü)
- [ ] Aktif sayfa vurgulama
- [ ] Bildirim ikonu (gelecekte)

**Öncelik:** 🔴 Yüksek

---

## 🟡 ORTA ÖNCELİKLİ - Kullanıcı Deneyimi

### 5. Profil Sayfaları
**Durum:** Eksik

**Backend Yapılacaklar:**
- [ ] `GET /api/users/:id` - Kullanıcı profili
- [ ] `PUT /api/users/profile` - Profil güncelle
- [ ] `POST /api/users/avatar` - Avatar yükle
- [ ] `GET /api/users/:id/routes` - Kullanıcının rotaları
- [ ] `GET /api/users/:id/posts` - Kullanıcının postları

**Frontend Yapılacaklar:**
- [ ] `/profile/[id]` sayfası oluştur
- [ ] Profil düzenleme sayfası
- [ ] Avatar yükleme
- [ ] Kullanıcının rotalarını göster
- [ ] Kullanıcının postlarını göster
- [ ] İstatistikler (takipçi, takip, rota sayısı)

**Öncelik:** 🟡 Orta

---

### 6. Takip (Follow) Sistemi
**Durum:** Veritabanı şeması var, backend/frontend eksik

**Backend Yapılacaklar:**
- [ ] `POST /api/users/:id/follow` - Takip et
- [ ] `DELETE /api/users/:id/follow` - Takipten çık
- [ ] `GET /api/users/:id/followers` - Takipçiler
- [ ] `GET /api/users/:id/following` - Takip edilenler
- [ ] `GET /api/users/:id/is-following` - Takip ediyor mu?

**Frontend Yapılacaklar:**
- [ ] Takip et/Takipten çık butonu
- [ ] Takipçi listesi sayfası
- [ ] Takip edilen listesi sayfası
- [ ] Feed'de sadece takip edilenlerin postları (filtre)

**Öncelik:** 🟡 Orta

---

### 7. Arama ve Filtreleme
**Durum:** SearchBar component var ama çalışmıyor

**Backend Yapılacaklar:**
- [ ] `GET /api/search` - Genel arama
  - [ ] Rotalar
  - [ ] Rehberler
  - [ ] Postlar
- [ ] Full-text search (PostgreSQL)
- [ ] Elasticsearch entegrasyonu (opsiyonel)

**Frontend Yapılacaklar:**
- [ ] SearchBar component'ini çalışır hale getir
- [ ] Arama sonuçları sayfası
- [ ] Otomatik tamamlama (autocomplete)
- [ ] Gelişmiş filtreleme
  - [ ] Fiyat aralığı
  - [ ] Tarih
  - [ ] Bölge
  - [ ] Rating

**Öncelik:** 🟡 Orta

---

### 8. Rehber Dashboard İyileştirmeleri
**Durum:** Temel sayfa var, özellikler eksik

**Yapılacaklar:**
- [ ] İstatistikler
  - [ ] ~~Toplam kazanç~~ → V2'ye ertelendi
  - [ ] Rota görüntülenme sayısı
  - [ ] ~~Satış sayısı~~ → V2'ye ertelendi
  - [ ] Takipçi artışı
- [ ] Grafik ve chartlar
- [ ] ~~Son satışlar listesi~~ → V2'ye ertelendi
- [ ] Yorumlar ve rating'ler
- [ ] ~~Kazanç raporu (aylık/yıllık)~~ → V2'ye ertelendi

**Öncelik:** 🟡 Orta

---

## 🟢 DÜŞÜK ÖNCELİKLİ - Gelişmiş Özellikler

### 9. Harita Entegrasyonu
**Durum:** Planlanmış

**Seçenekler:**
- [ ] Google Maps API
- [ ] Mapbox
- [ ] Leaflet (açık kaynak)

**Yapılacaklar:**
- [ ] Harita kütüphanesi seç ve kur
- [ ] Rota oluşturmada harita
  - [ ] Nokta ekleme (waypoints)
  - [ ] Çizgi çizme
  - [ ] Mesafe hesaplama
- [ ] Rota detayında harita
- [ ] Ana sayfada harita görünümü
- [ ] Konum bazlı arama

**Öncelik:** 🟢 Düşük

---

### 10. Dosya Yükleme (MinIO)
**Durum:** MinIO container hazır, entegrasyon eksik

**Backend Yapılacaklar:**
- [ ] MinIO client konfigürasyonu
- [ ] File upload service
- [ ] `POST /api/upload/image` - Resim yükle
- [ ] `POST /api/upload/video` - Video yükle
- [ ] Dosya boyutu kontrolü
- [ ] Dosya tipi kontrolü
- [ ] Thumbnail oluşturma

**Frontend Yapılacaklar:**
- [ ] Drag & drop upload component
- [ ] Progress bar (yükleme ilerlemesi)
- [ ] Resim önizleme
- [ ] Çoklu dosya yükleme
- [ ] Avatar crop tool

**Öncelik:** 🟢 Düşük

---

### 11. Bildirimler (Notifications)
**Durum:** Planlanmış

**Backend Yapılacaklar:**
- [ ] Notification modeli ve migration
- [ ] `GET /api/notifications` - Bildirimleri listele
- [ ] `PUT /api/notifications/:id/read` - Okundu işaretle
- [ ] WebSocket entegrasyonu (Socket.io)
- [ ] Bildirim tipleri:
  - [ ] Yeni takipçi
  - [ ] Yorum
  - [ ] Beğeni
  - [ ] Satın alma
  - [ ] Yeni mesaj

**Frontend Yapılacaklar:**
- [ ] Bildirim ikonu (navbar)
- [ ] Bildirim dropdown
- [ ] Gerçek zamanlı güncelleme
- [ ] Bildirim sesleri
- [ ] Bildirim ayarları sayfası

**Öncelik:** 🟢 Düşük

---

### 12. Mesajlaşma Sistemi
**Durum:** Planlanmış

**Backend Yapılacaklar:**
- [ ] Message modeli
- [ ] Conversation modeli
- [ ] `GET /api/conversations` - Konuşmalar
- [ ] `GET /api/conversations/:id/messages` - Mesajlar
- [ ] `POST /api/messages` - Mesaj gönder
- [ ] WebSocket ile gerçek zamanlı mesajlaşma
- [ ] Okundu bilgisi

**Frontend Yapılacaklar:**
- [ ] Mesajlaşma sayfası
- [ ] Konuşma listesi
- [ ] Mesaj kutusu
- [ ] Gerçek zamanlı mesaj alma
- [ ] Yazıyor... göstergesi
- [ ] Dosya gönderme

**Öncelik:** 🟢 Düşük

---

### 13. Ödeme Sistemi ⏸️ V2'YE ERTELENDİ
**Durum:** Planlanmış (V2)

**Not:** İlk versiyonda satın alma ve fiyatlandırma olmayacak. Rotalar ücretsiz paylaşılacak ve rehberlerle iletişim odaklı bir platform olacak.

**✅ TAMAMLANDI - 8 Mart 2026:**
- Price ve Purchase modelleri veritabanından kaldırıldı
- Backend'den tüm fiyat ve satın alma referansları temizlendi
- Frontend RouteCard'a "Rehberle İletişime Geç" butonu eklendi
- Mesajlaşma sistemi V1.2'de eklenecek

**Seçenekler:**
- [ ] Stripe
- [ ] PayPal
- [ ] İyzico (Türkiye için)

**Yapılacaklar (V2):**
- [ ] Ödeme gateway entegrasyonu
- [ ] Rota satın alma akışı
- [ ] Ödeme geçmişi
- [ ] Fatura oluşturma
- [ ] Rehber kazanç sistemi
- [ ] Para çekme (withdrawal)
- [ ] Komisyon hesaplama

**Öncelik:** ⏸️ V2

---

### 14. Email Sistemi
**Durum:** Planlanmış

**Yapılacaklar:**
- [ ] Email servis (NodeMailer/SendGrid)
- [ ] Email şablonları
- [ ] Hoş geldin emaili
- [ ] Email doğrulama
- [ ] Şifre sıfırlama
- [ ] Bildirim emailleri
- [ ] Haftalık özet emaili

**Öncelik:** 🟢 Düşük

---

### 15. Admin Panel
**Durum:** Planlanmış

**Yapılacaklar:**
- [ ] Admin rolü ve yetkilendirme
- [ ] Kullanıcı yönetimi
- [ ] Rota moderasyonu
- [ ] İçerik moderasyonu
- [ ] İstatistikler ve raporlar
- [ ] Sistem ayarları

**Öncelik:** 🟢 Düşük

---

## 🔧 TEKNİK İYİLEŞTİRMELER

### 16. Testing (Test Yazımı)
**Durum:** Test yok

**Yapılacaklar:**
- [ ] Backend unit testler (Jest)
- [ ] Backend e2e testler
- [ ] Frontend component testler (React Testing Library)
- [ ] Frontend e2e testler (Playwright/Cypress)
- [ ] API testleri (Postman/Insomnia)
- [ ] Test coverage %80+

**Öncelik:** 🟡 Orta

---

### 17. Performance Optimizasyonu
**Durum:** Temel optimizasyon var

**Yapılacaklar:**
- [ ] Redis cache stratejisi
  - [ ] Feed cache
  - [ ] Rota listesi cache
  - [ ] Kullanıcı profili cache
- [ ] Database indexleme
- [ ] Query optimizasyonu
- [ ] Image optimization (Next.js Image)
- [ ] Lazy loading
- [ ] Code splitting
- [ ] CDN entegrasyonu

**Öncelik:** 🟡 Orta

---

### 18. Security (Güvenlik)
**Durum:** Temel güvenlik var

**Yapılacaklar:**
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] XSS protection
- [ ] SQL injection koruması (Prisma zaten koruyor)
- [ ] Helmet.js entegrasyonu
- [ ] Input validation (class-validator)
- [ ] File upload güvenliği
- [ ] API key yönetimi
- [ ] 2FA (Two-Factor Authentication)

**Öncelik:** 🔴 Yüksek (Production öncesi)

---

### 19. Logging ve Monitoring
**Durum:** Temel console.log var

**Yapılacaklar:**
- [ ] Winston logger entegrasyonu
- [ ] Log seviyeleri (error, warn, info, debug)
- [ ] Log dosyaları
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Uptime monitoring
- [ ] Database monitoring

**Öncelik:** 🟡 Orta

---

### 20. Documentation
**Durum:** Temel dokümantasyon var

**Yapılacaklar:**
- [ ] API dokümantasyonu (Swagger) - ✅ Var ama güncellenmeli
- [ ] Component dokümantasyonu (Storybook)
- [ ] Deployment guide güncelle
- [ ] Contributing guide
- [ ] Code of conduct
- [ ] Changelog
- [ ] Video tutorials

**Öncelik:** 🟢 Düşük

---

## 🚀 DEPLOYMENT

### 21. Production Deployment
**Durum:** Planlanmış

**Yapılacaklar:**
- [ ] Production Docker image'ları
- [ ] Environment variable yönetimi
- [ ] SSL/TLS sertifikası
- [ ] Domain ayarları
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Backup stratejisi
- [ ] Disaster recovery planı

**Seçenekler:**
- [ ] AWS (EC2, RDS, S3)
- [ ] DigitalOcean
- [ ] Vercel (Frontend)
- [ ] Railway/Render (Backend)
- [ ] Kubernetes (gelecekte)

**Öncelik:** 🟡 Orta (MVP sonrası)

---

## � VERSİYON 2 - Gelecek Sürüm Özellikleri

### V2.1: Monetizasyon (Para Kazanma)
**Hedef Tarih:** TBD

**Özellikler:**
- [ ] Rota fiyatlandırma sistemi
  - [ ] Rehberler rotalarına fiyat belirleyebilir
  - [ ] Ücretsiz/Ücretli rota seçeneği
  - [ ] Dinamik fiyatlandırma
- [ ] Satın alma sistemi
  - [ ] Rota satın alma
  - [ ] Satın alma geçmişi
  - [ ] Dijital fatura
- [ ] Ödeme gateway entegrasyonu
  - [ ] Stripe/İyzico
  - [ ] Kredi kartı ödemeleri
  - [ ] Güvenli ödeme
- [ ] Kazanç sistemi
  - [ ] Rehber kazanç paneli
  - [ ] Para çekme (withdrawal)
  - [ ] Komisyon yönetimi
  - [ ] Gelir raporları

### V2.2: Premium Özellikler
**Hedef Tarih:** TBD

**Özellikler:**
- [ ] Abonelik sistemi
  - [ ] Ücretsiz/Premium/Pro planlar
  - [ ] Aylık/Yıllık abonelik
- [ ] Premium rehber özellikleri
  - [ ] Öncelikli listeleme
  - [ ] Gelişmiş analitik
  - [ ] Özel rozet
  - [ ] Reklamsız deneyim
- [ ] Premium turist özellikleri
  - [ ] Sınırsız rota indirme
  - [ ] Offline erişim
  - [ ] Özel destek

---

## 💡 FİKİRLER - Gelecek Özellikler

### Potansiyel Özellikler (Öncelik Belirlenmedi)

- [ ] **Mobil Uygulama** (React Native)
- [ ] **Çoklu Dil Desteği** (i18n)
- [ ] **Dark Mode** (Karanlık tema)
- [ ] **Sesli Rehber** (Audio guide)
- [ ] **AR (Augmented Reality)** Özellikler
- [ ] **Gamification** (Rozet, seviye sistemi)
- [ ] **Referans Sistemi** (Arkadaşını davet et)
- [ ] **Blog/Makale** Sistemi
- [ ] **Event/Etkinlik** Yönetimi
- [ ] **Grup Turları** Organizasyonu
- [ ] **Canlı Tur** (Live streaming)
- [ ] **AI Chatbot** (Müşteri desteği)
- [ ] **Öneri Sistemi** (ML tabanlı)
- [ ] **Sosyal Medya Entegrasyonu** (Instagram, Facebook)
- [ ] **QR Kod** ile check-in
- [ ] **Offline Mode** (PWA)

---

## 📝 NOTLAR

### Geliştirme Kuralları
1. Her özellik için branch aç (`feature/ozellik-adi`)
2. Commit mesajları açıklayıcı olsun
3. Her önemli değişiklikte PROGRESS.md'yi güncelle
4. Test yaz (mümkünse)
5. Code review yap
6. Main branch'e merge et

### Öncelik Seviyeleri
- 🔴 **Yüksek:** Uygulamanın çalışması için gerekli
- 🟡 **Orta:** Kullanıcı deneyimi için önemli
- 🟢 **Düşük:** Nice-to-have özellikler

### Durum İşaretleri
- [ ] Yapılmadı
- [x] Tamamlandı
- [~] Devam ediyor
- [!] Sorunlu/Beklemede

---

## 🎯 SONRAKİ SPRINT

### Sprint 1: Temel Özellikler (Tahmini: 2-3 gün)
1. Login sorununu çöz ve test et
2. Feed sayfasını tamamla (post oluşturma, listeleme)
3. Routes modülünü tamamla (listeleme, detay)
4. Navbar'ı düzelt

### Sprint 2: Kullanıcı Deneyimi (Tahmini: 2-3 gün)
1. Profil sayfaları
2. Takip sistemi
3. Arama ve filtreleme
4. Yorum ve beğeni sistemi

### Sprint 3: Gelişmiş Özellikler (Tahmini: 3-5 gün)
1. Harita entegrasyonu
2. Dosya yükleme
3. Bildirimler
4. Performance optimizasyonu

---

**Yeni özellik eklemek için:**
1. Bu dosyayı aç
2. İlgili bölüme ekle
3. Öncelik seviyesi belirle
4. Commit et: `git commit -m "TODO: Add new feature idea"`

**Özellik tamamlandığında:**
1. [ ] işaretini [x] yap
2. PROGRESS.md'ye detaylı açıklama ekle
3. Commit et: `git commit -m "Complete: Feature name"`
