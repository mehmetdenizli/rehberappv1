# Frontend Kullanım Rehberi

## 📱 Sayfalar ve Özellikler

### 1. Ana Sayfa (/)
**Dosya**: `frontend/src/app/page.tsx`

Özellikler:
- Hero section ile hoş geldin mesajı
- Platform özelliklerinin tanıtımı
- İstatistikler (kullanıcı, rota, rehber sayıları)
- "Hemen Başla" ve "Rotaları Keşfet" butonları
- Navbar ve Footer entegrasyonu

### 2. Kayıt Sayfası (/auth/register)
**Dosya**: `frontend/src/app/auth/register/page.tsx`

Özellikler:
- E-posta, kullanıcı adı, şifre girişi
- Şifre tekrar kontrolü
- Rol seçimi (Turist / Rehber)
- Form validasyonu
- Hata mesajları
- Giriş sayfasına yönlendirme linki

### 3. Giriş Sayfası (/auth/login)
**Dosya**: `frontend/src/app/auth/login/page.tsx`

Özellikler:
- E-posta ve şifre girişi
- JWT token yönetimi
- Başarılı girişte feed'e yönlendirme
- Kayıt sayfasına link
- Hata yönetimi

### 4. Sosyal Feed (/feed)
**Dosya**: `frontend/src/app/feed/page.tsx`

Özellikler:
- Gönderi oluşturma bileşeni
- Dinamik gönderi listesi
- Kullanıcı bilgileri ile gönderiler
- Yorum ve beğeni sayıları
- Boş durum mesajı
- Navbar entegrasyonu

### 5. Rotalar Sayfası (/routes)
**Dosya**: `frontend/src/app/routes/page.tsx`

Özellikler:
- Gelişmiş filtreleme (bölge, kategori, fiyat)
- Grid layout ile rota kartları
- RouteCard bileşeni kullanımı
- Arama fonksiyonu
- Boş durum mesajı
- Loading state

### 6. Rota Detay (/routes/[id])
**Dosya**: `frontend/src/app/routes/[id]/page.tsx`

Özellikler:
- Rota detay bilgileri
- Fiyat ve satın alma butonu
- Rehber bilgileri
- Harita placeholder
- Kategori ve bölge etiketleri
- Değerlendirme ve satış sayıları

### 7. Rehber Dashboard (/guide/dashboard)
**Dosya**: `frontend/src/app/guide/dashboard/page.tsx`

Özellikler:
- İstatistik kartları (rota, kazanç, takipçi, puan)
- Rotalarım listesi
- Yeni rota oluşturma butonu
- Rota durumu (yayında/taslak)
- Satış geçmişi
- Boş durum mesajları

### 8. Rota Oluştur (/guide/create-route)
**Dosya**: `frontend/src/app/guide/create-route/page.tsx`

Özellikler:
- Kapsamlı form (başlık, açıklama, bölge, kategori, fiyat)
- Kategori dropdown
- Yayınlama checkbox
- Harita placeholder
- Form validasyonu
- Loading state
- Hata yönetimi
- İptal butonu

## 🧩 Bileşenler

### Navbar
**Dosya**: `frontend/src/components/Layout/Navbar.tsx`

Özellikler:
- Dinamik menü (giriş durumuna göre)
- Kullanıcı bilgisi gösterimi
- Rol bazlı menü öğeleri (rehber için dashboard)
- Çıkış yapma fonksiyonu
- Responsive tasarım

### Footer
**Dosya**: `frontend/src/components/UI/Footer.tsx`

Özellikler:
- 4 kolonlu layout
- Navigasyon linkleri
- Sosyal medya alanı
- Copyright bilgisi

### PostCard
**Dosya**: `frontend/src/components/Feed/PostCard.tsx`

Özellikler:
- Kullanıcı avatar ve bilgileri
- Doğrulanmış rozet gösterimi
- Medya gösterimi (grid layout)
- Etkileşim butonları (beğeni, yorum, paylaş)
- Tarih formatlaması

### CreatePost
**Dosya**: `frontend/src/components/Feed/CreatePost.tsx`

Özellikler:
- Textarea ile içerik girişi
- Medya ekleme butonları (placeholder)
- API entegrasyonu
- Loading state
- Hata yönetimi
- Callback fonksiyonu

### RouteCard
**Dosya**: `frontend/src/components/Route/RouteCard.tsx`

Özellikler:
- Görsel alan (gradient fallback)
- Fiyat badge
- Kategori ve bölge etiketleri
- Rehber bilgileri
- Doğrulanmış rozet
- Detay linki
- İstatistikler (değerlendirme, satış)

## 🎨 Stil ve Tasarım

### Tailwind CSS Kullanımı
- Utility-first yaklaşım
- Responsive breakpoints (md:, lg:)
- Custom primary renk paleti
- Hover ve transition efektleri
- Shadow ve rounded köşeler

### Renk Paleti
```css
primary-50: #f0f9ff
primary-100: #e0f2fe
primary-500: #0ea5e9
primary-600: #0284c7 (ana renk)
primary-700: #0369a1
```

## 🔌 API Entegrasyonu

### API Client
**Dosya**: `frontend/src/lib/api.ts`

Özellikler:
- Axios instance
- Base URL yapılandırması
- Otomatik token ekleme (interceptor)
- Error handling

### State Management
**Dosya**: `frontend/src/store/authStore.ts`

Zustand store ile:
- User state
- Token yönetimi
- Login/Register/Logout fonksiyonları
- LocalStorage entegrasyonu

## 🚀 Kullanım Örnekleri

### Yeni Sayfa Ekleme

```typescript
// frontend/src/app/yeni-sayfa/page.tsx
'use client';

import Navbar from '@/components/Layout/Navbar';

export default function YeniSayfa() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Yeni Sayfa</h1>
      </div>
    </div>
  );
}
```

### API Çağrısı Yapma

```typescript
import api from '@/lib/api';

const fetchData = async () => {
  try {
    const response = await api.get('/endpoint');
    setData(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Yeni Bileşen Oluşturma

```typescript
// frontend/src/components/YeniBileşen.tsx
interface YeniBileşenProps {
  title: string;
}

export default function YeniBileşen({ title }: YeniBileşenProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2>{title}</h2>
    </div>
  );
}
```

## 📝 Yapılacaklar

### Kısa Vadeli
- [ ] Profil sayfası
- [ ] Kullanıcı ayarları
- [ ] Bildirimler
- [ ] Arama fonksiyonu

### Orta Vadeli
- [ ] Gerçek harita entegrasyonu (Leaflet)
- [ ] Medya yükleme (MinIO)
- [ ] Gerçek zamanlı bildirimler
- [ ] Chat sistemi

### Uzun Vadeli
- [ ] PWA desteği
- [ ] Dark mode
- [ ] Çoklu dil desteği
- [ ] Mobil uygulama

## 🐛 Bilinen Sorunlar

1. Harita entegrasyonu henüz eklenmedi (placeholder gösteriliyor)
2. Medya yükleme fonksiyonu aktif değil
3. Gerçek zamanlı güncellemeler yok
4. SEO optimizasyonu yapılmadı

## 💡 İpuçları

1. Her zaman Navbar bileşenini kullanın
2. Loading state'leri ekleyin
3. Error handling yapın
4. Responsive tasarım kontrol edin
5. TypeScript type'larını kullanın
6. API çağrılarında try-catch kullanın
