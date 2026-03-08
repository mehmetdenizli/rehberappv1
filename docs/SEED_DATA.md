# Test Verileri (Seed Data)

## 🌱 Veritabanını Doldurma

Test için hazır veriler oluşturulmuştur. Aşağıdaki komutu çalıştırarak veritabanını doldurabilirsiniz:

```bash
cd backend
npm run prisma:seed
```

## 👥 Oluşturulan Kullanıcılar

### Rehberler (5 kişi)

| İsim | Email | Kullanıcı Adı | Bölge | Uzmanlık |
|------|-------|---------------|-------|----------|
| Ahmet Yılmaz | ahmet.yilmaz@example.com | ahmetyilmaz | İstanbul | Tarihi Yarımada, Boğaz |
| Zeynep Kaya | zeynep.kaya@example.com | zeynepkaya | Kapadokya | Doğa, Kültür |
| Mehmet Demir | mehmet.demir@example.com | mehmetdemir | Ege | Antik Kentler, Gastronomi |
| Ayşe Çelik | ayse.celik@example.com | aysecelik | Antalya | Macera, Trekking |
| Can Öztürk | can.ozturk@example.com | canozturk | Karadeniz | Doğa, Fotoğrafçılık |

### Turistler (5 kişi)

| İsim | Email | Kullanıcı Adı |
|------|-------|---------------|
| Ali Yıldırım | ali.yildirim@example.com | aliyildirim |
| Elif Şahin | elif.sahin@example.com | elifsahin |
| Burak Arslan | burak.arslan@example.com | burakarslan |
| Selin Koç | selin.koc@example.com | selinkoc |
| Emre Yavuz | emre.yavuz@example.com | emreyavuz |

**Tüm kullanıcılar için şifre:** `password123`

## 🗺️ Oluşturulan Rotalar (17 adet)

### İstanbul (Ahmet Yılmaz)
1. **İstanbul Tarihi Yarımada Turu** - 450₺
   - Sultanahmet, Ayasofya, Topkapı Sarayı, Kapalıçarşı
   
2. **Boğaz Turu ve Balık Lokantası** - 380₺
   - Boğaz gezisi, tarihi yalılar, akşam yemeği
   
3. **Beyoğlu Kültür ve Sanat Turu** - 320₺
   - İstiklal Caddesi, Galata Kulesi, müzeler

### Kapadokya (Zeynep Kaya)
4. **Kapadokya Balon Turu ve Vadiler** - 850₺
   - Sıcak hava balonu, Göreme, peri bacaları
   
5. **Yeraltı Şehirleri Keşfi** - 420₺
   - Derinkuyu, Kaymaklı yeraltı şehirleri
   
6. **Kapadokya Şarap Rotası** - 380₺
   - Şarap mahzenleri, tadım, yerel lezzetler

### Ege (Mehmet Demir)
7. **Efes Antik Kenti Turu** - 480₺
   - Dünyanın en iyi korunmuş antik kenti
   
8. **Şirince Köyü ve Şarap Tadımı** - 350₺
   - Otantik köy, ev yapımı şaraplar
   
9. **Pamukkale Travertenleri** - 520₺
   - Beyaz cennet, Hierapolis antik kenti

### Antalya (Ayşe Çelik)
10. **Köprülü Kanyon Rafting** - 420₺
    - Adrenalin dolu rafting, ekipman dahil
    
11. **Likya Yolu Trekking** - 680₺
    - 2 günlük trekking, kamp dahil
    
12. **Antalya Şehir Turu** - 280₺
    - Kaleiçi, Düden Şelalesi, antik liman

### Karadeniz (Can Öztürk)
13. **Ayder Yaylası Doğa Turu** - 390₺
    - Yeşil doğa, şelaleler, termal kaynaklar
    
14. **Kaçkar Dağları Trekking** - 950₺
    - 3 günlük trekking macerası
    
15. **Uzungöl ve Çay Bahçeleri** - 320₺
    - Uzungöl manzarası, çay bahçeleri

## 📱 Oluşturulan İçerikler

- **5 Gönderi** (Posts) - Rehberler ve turistlerden
- **2 Yorum** (Comments)
- **8 Takip İlişkisi** (Follows)
- **5 Değerlendirme** (Ratings)
- **5 Satın Alma** (Purchases)

## 🔐 Giriş Yapma

Herhangi bir kullanıcı ile giriş yapabilirsiniz:

```
Email: ahmet.yilmaz@example.com
Şifre: password123
```

veya

```
Email: ali.yildirim@example.com
Şifre: password123
```

## 🧪 Test Senaryoları

### Turist Olarak Test
1. `ali.yildirim@example.com` ile giriş yap
2. Feed'de gönderileri gör
3. Rotaları keşfet ve filtrele
4. Rota detaylarını incele
5. Rehberleri takip et

### Rehber Olarak Test
1. `ahmet.yilmaz@example.com` ile giriş yap
2. Dashboard'a git
3. Rotalarını gör
4. Yeni rota oluştur
5. İstatistikleri kontrol et

## 🔄 Veritabanını Sıfırlama

Veritabanını temizleyip yeniden doldurmak için:

```bash
cd backend
npx prisma migrate reset
npm run prisma:seed
```

## 📊 Veri İstatistikleri

- Toplam Kullanıcı: 10 (5 Rehber + 5 Turist)
- Toplam Rota: 17
- Doğrulanmış Rehber: 4
- Ortalama Rota Fiyatı: ~470₺
- Kategoriler: Tarihi, Doğa, Kültür, Gastronomi, Macera, Şehir Turu
- Bölgeler: İstanbul, Nevşehir, İzmir, Denizli, Antalya, Rize, Trabzon
