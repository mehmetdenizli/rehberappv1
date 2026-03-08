#!/bin/bash

echo "🌱 Seeding database via API..."
echo ""

API_URL="http://localhost:3001/api"

# Rehberler oluştur
echo "Creating guides..."

# 1. Ahmet Yılmaz
AHMET_TOKEN=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmet.yilmaz@example.com",
    "username": "ahmetyilmaz",
    "password": "password123",
    "role": "GUIDE"
  }' | jq -r '.access_token')

echo "✓ Ahmet Yılmaz created"

# 2. Zeynep Kaya
ZEYNEP_TOKEN=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "zeynep.kaya@example.com",
    "username": "zeynepkaya",
    "password": "password123",
    "role": "GUIDE"
  }' | jq -r '.access_token')

echo "✓ Zeynep Kaya created"

# 3. Mehmet Demir
MEHMET_TOKEN=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mehmet.demir@example.com",
    "username": "mehmetdemir",
    "password": "password123",
    "role": "GUIDE"
  }' | jq -r '.access_token')

echo "✓ Mehmet Demir created"

# 4. Ayşe Çelik
AYSE_TOKEN=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ayse.celik@example.com",
    "username": "aysecelik",
    "password": "password123",
    "role": "GUIDE"
  }' | jq -r '.access_token')

echo "✓ Ayşe Çelik created"

# 5. Can Öztürk
CAN_TOKEN=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "can.ozturk@example.com",
    "username": "canozturk",
    "password": "password123",
    "role": "GUIDE"
  }' | jq -r '.access_token')

echo "✓ Can Öztürk created"
echo ""

# Turistler oluştur
echo "Creating tourists..."

curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ali.yildirim@example.com",
    "username": "aliyildirim",
    "password": "password123",
    "role": "TOURIST"
  }' > /dev/null

echo "✓ Ali Yıldırım created"

curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "elif.sahin@example.com",
    "username": "elifsahin",
    "password": "password123",
    "role": "TOURIST"
  }' > /dev/null

echo "✓ Elif Şahin created"

curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "burak.arslan@example.com",
    "username": "burakarslan",
    "password": "password123",
    "role": "TOURIST"
  }' > /dev/null

echo "✓ Burak Arslan created"

curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "selin.koc@example.com",
    "username": "selinkoc",
    "password": "password123",
    "role": "TOURIST"
  }' > /dev/null

echo "✓ Selin Koç created"

curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "emre.yavuz@example.com",
    "username": "emreyavuz",
    "password": "password123",
    "role": "TOURIST"
  }' > /dev/null

echo "✓ Emre Yavuz created"
echo ""

# Rotalar oluştur
echo "Creating routes..."

# Ahmet'in rotaları
curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AHMET_TOKEN" \
  -d '{
    "title": "İstanbul Tarihi Yarımada Turu",
    "description": "Sultanahmet, Ayasofya, Topkapı Sarayı ve Kapalıçarşıyı kapsayan tam gün turu. Osmanlı ve Bizans tarihini yerinde keşfedin.",
    "geoJson": {},
    "price": 450,
    "region": "İstanbul",
    "category": "Tarihi",
    "isPublished": true
  }' > /dev/null

curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AHMET_TOKEN" \
  -d '{
    "title": "Boğaz Turu ve Balık Lokantası",
    "description": "Boğazın iki yakasını gemi ile gezerek tarihi yalıları, köprüleri ve kaleleri görün. Akşam balık yemeği dahil.",
    "geoJson": {},
    "price": 380,
    "region": "İstanbul",
    "category": "Gastronomi",
    "isPublished": true
  }' > /dev/null

curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AHMET_TOKEN" \
  -d '{
    "title": "Beyoğlu Kültür ve Sanat Turu",
    "description": "İstiklal Caddesi, Galata Kulesi, müzeler ve sanat galerileri. Modern İstanbulu keşfedin.",
    "geoJson": {},
    "price": 320,
    "region": "İstanbul",
    "category": "Kültür",
    "isPublished": true
  }' > /dev/null

echo "✓ Ahmet's routes created (3)"

# Zeynep'in rotaları
curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ZEYNEP_TOKEN" \
  -d '{
    "title": "Kapadokya Balon Turu ve Vadiler",
    "description": "Gün doğumunda sıcak hava balonu turu, ardından Göreme Açık Hava Müzesi ve peri bacaları gezisi.",
    "geoJson": {},
    "price": 850,
    "region": "Nevşehir",
    "category": "Doğa",
    "isPublished": true
  }' > /dev/null

curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ZEYNEP_TOKEN" \
  -d '{
    "title": "Yeraltı Şehirleri Keşfi",
    "description": "Derinkuyu ve Kaymaklı yeraltı şehirlerini keşfedin. Antik dönem mühendislik harikası.",
    "geoJson": {},
    "price": 420,
    "region": "Nevşehir",
    "category": "Tarihi",
    "isPublished": true
  }' > /dev/null

curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ZEYNEP_TOKEN" \
  -d '{
    "title": "Kapadokya Şarap Rotası",
    "description": "Bölgenin ünlü şarap mahzenlerini ziyaret edin. Tadım ve yerel lezzetler dahil.",
    "geoJson": {},
    "price": 380,
    "region": "Nevşehir",
    "category": "Gastronomi",
    "isPublished": true
  }' > /dev/null

echo "✓ Zeynep's routes created (3)"

# Mehmet'in rotaları
curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $MEHMET_TOKEN" \
  -d '{
    "title": "Efes Antik Kenti Turu",
    "description": "Dünyanın en iyi korunmuş antik kentlerinden Efesi profesyonel rehberlik eşliğinde gezin.",
    "geoJson": {},
    "price": 480,
    "region": "İzmir",
    "category": "Tarihi",
    "isPublished": true
  }' > /dev/null

curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $MEHMET_TOKEN" \
  -d '{
    "title": "Şirince Köyü ve Şarap Tadımı",
    "description": "Otantik Şirince köyünde gezinti, ev yapımı şaraplar ve yerel ürünler tadımı.",
    "geoJson": {},
    "price": 350,
    "region": "İzmir",
    "category": "Gastronomi",
    "isPublished": true
  }' > /dev/null

curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $MEHMET_TOKEN" \
  -d '{
    "title": "Pamukkale Travertenleri",
    "description": "Beyaz cennet Pamukkale travertenleri ve Hierapolis antik kenti gezisi.",
    "geoJson": {},
    "price": 520,
    "region": "Denizli",
    "category": "Doğa",
    "isPublished": true
  }' > /dev/null

echo "✓ Mehmet's routes created (3)"

# Ayşe'nin rotaları
curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AYSE_TOKEN" \
  -d '{
    "title": "Köprülü Kanyon Rafting",
    "description": "Adrenalin dolu rafting macerası. Tüm ekipman ve öğle yemeği dahil. Deneyim gerekmez.",
    "geoJson": {},
    "price": 420,
    "region": "Antalya",
    "category": "Macera",
    "isPublished": true
  }' > /dev/null

curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AYSE_TOKEN" \
  -d '{
    "title": "Likya Yolu Trekking",
    "description": "2 günlük Likya Yolu trekking turu. Kamp, yemek ve rehberlik dahil.",
    "geoJson": {},
    "price": 680,
    "region": "Antalya",
    "category": "Doğa",
    "isPublished": true
  }' > /dev/null

curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AYSE_TOKEN" \
  -d '{
    "title": "Antalya Şehir Turu",
    "description": "Kaleiçi, Düden Şelalesi ve antik limanı kapsayan şehir turu.",
    "geoJson": {},
    "price": 280,
    "region": "Antalya",
    "category": "Şehir Turu",
    "isPublished": true
  }' > /dev/null

echo "✓ Ayşe's routes created (3)"

# Can'ın rotaları
curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $CAN_TOKEN" \
  -d '{
    "title": "Ayder Yaylası Doğa Turu",
    "description": "Yeşilin her tonunu göreceğiniz Ayder Yaylası, şelaleler ve termal kaynaklar turu.",
    "geoJson": {},
    "price": 390,
    "region": "Rize",
    "category": "Doğa",
    "isPublished": true
  }' > /dev/null

curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $CAN_TOKEN" \
  -d '{
    "title": "Kaçkar Dağları Trekking",
    "description": "3 günlük Kaçkar Dağları trekking macerası. Kamp, yemek ve ekipman dahil.",
    "geoJson": {},
    "price": 950,
    "region": "Rize",
    "category": "Macera",
    "isPublished": true
  }' > /dev/null

curl -s -X POST "$API_URL/routes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $CAN_TOKEN" \
  -d '{
    "title": "Uzungöl ve Çay Bahçeleri",
    "description": "Uzungölün eşsiz manzarası ve çay bahçeleri gezisi. Yerel kahvaltı dahil.",
    "geoJson": {},
    "price": 320,
    "region": "Trabzon",
    "category": "Doğa",
    "isPublished": true
  }' > /dev/null

echo "✓ Can's routes created (3)"
echo ""

echo "🎉 Seeding completed!"
echo ""
echo "📊 Summary:"
echo "   - 5 Guides created"
echo "   - 5 Tourists created"
echo "   - 15 Routes created"
echo ""
echo "🔐 Login credentials:"
echo "   Email: ahmet.yilmaz@example.com"
echo "   Password: password123"
echo ""
