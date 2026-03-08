import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Önce mevcut verileri temizle
  await prisma.rating.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.route.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Existing data cleared');

  // Şifre hash'i
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 5 Rehber Oluştur
  const guides = await Promise.all([
    prisma.user.create({
      data: {
        email: 'ahmet.yilmaz@example.com',
        username: 'ahmetyilmaz',
        password: hashedPassword,
        role: 'GUIDE',
        firstName: 'Ahmet',
        lastName: 'Yılmaz',
        bio: 'İstanbul\'da 15 yıldır profesyonel turist rehberliği yapıyorum. Tarihi yarımada ve Boğaz turları konusunda uzmanım.',
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'zeynep.kaya@example.com',
        username: 'zeynepkaya',
        password: hashedPassword,
        role: 'GUIDE',
        firstName: 'Zeynep',
        lastName: 'Kaya',
        bio: 'Kapadokya bölgesinde doğa ve kültür turları düzenliyorum. 10 yıllık deneyimim var.',
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'mehmet.demir@example.com',
        username: 'mehmetdemir',
        password: hashedPassword,
        role: 'GUIDE',
        firstName: 'Mehmet',
        lastName: 'Demir',
        bio: 'Ege bölgesi antik kentleri ve gastronomi turları konusunda uzmanım. Arkeoloji mezunuyum.',
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'ayse.celik@example.com',
        username: 'aysecelik',
        password: hashedPassword,
        role: 'GUIDE',
        firstName: 'Ayşe',
        lastName: 'Çelik',
        bio: 'Antalya ve çevresinde macera turları düzenliyorum. Dağcılık ve trekking eğitmenim.',
        isVerified: false,
      },
    }),
    prisma.user.create({
      data: {
        email: 'can.ozturk@example.com',
        username: 'canozturk',
        password: hashedPassword,
        role: 'GUIDE',
        firstName: 'Can',
        lastName: 'Öztürk',
        bio: 'Karadeniz bölgesi doğa turları ve yayla gezileri organize ediyorum. Fotoğrafçılık tutkunu.',
        isVerified: true,
      },
    }),
  ]);

  console.log('✅ 5 guides created');

  // 5 Turist Oluştur
  const tourists = await Promise.all([
    prisma.user.create({
      data: {
        email: 'ali.yildirim@example.com',
        username: 'aliyildirim',
        password: hashedPassword,
        role: 'TOURIST',
        firstName: 'Ali',
        lastName: 'Yıldırım',
        bio: 'Seyahat etmeyi ve yeni yerler keşfetmeyi seviyorum.',
      },
    }),
    prisma.user.create({
      data: {
        email: 'elif.sahin@example.com',
        username: 'elifsahin',
        password: hashedPassword,
        role: 'TOURIST',
        firstName: 'Elif',
        lastName: 'Şahin',
        bio: 'Tarihi mekanları gezmek ve fotoğraf çekmek hobim.',
      },
    }),
    prisma.user.create({
      data: {
        email: 'burak.arslan@example.com',
        username: 'burakarslan',
        password: hashedPassword,
        role: 'TOURIST',
        firstName: 'Burak',
        lastName: 'Arslan',
        bio: 'Doğa yürüyüşleri ve kamp yapmayı çok severim.',
      },
    }),
    prisma.user.create({
      data: {
        email: 'selin.koc@example.com',
        username: 'selinkoc',
        password: hashedPassword,
        role: 'TOURIST',
        firstName: 'Selin',
        lastName: 'Koç',
        bio: 'Gastronomi tutkunu, yerel lezzetleri keşfetmeyi seviyorum.',
      },
    }),
    prisma.user.create({
      data: {
        email: 'emre.yavuz@example.com',
        username: 'emreyavuz',
        password: hashedPassword,
        role: 'TOURIST',
        firstName: 'Emre',
        lastName: 'Yavuz',
        bio: 'Macera sporları ve ekstrem aktiviteler ilgi alanım.',
      },
    }),
  ]);

  console.log('✅ 5 tourists created');

  // Her rehber için 3-4 rota oluştur
  const routes = [];

  // Ahmet Yılmaz'ın rotaları (İstanbul)
  routes.push(
    await prisma.route.create({
      data: {
        title: 'İstanbul Tarihi Yarımada Turu',
        description: 'Sultanahmet, Ayasofya, Topkapı Sarayı ve Kapalıçarşı\'yı kapsayan tam gün turu. Osmanlı ve Bizans tarihini yerinde keşfedin.',
        geoJson: { type: 'LineString', coordinates: [[28.9784, 41.0082], [28.9802, 41.0086]] },
        region: 'İstanbul',
        category: 'Tarihi',
        guideId: guides[0].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
    await prisma.route.create({
      data: {
        title: 'Boğaz Turu ve Balık Lokantası',
        description: 'Boğaz\'ın iki yakasını gemi ile gezerek tarihi yalıları, köprüleri ve kaleleri görün. Akşam balık yemeği dahil.',
        geoJson: { type: 'LineString', coordinates: [[29.0208, 41.0392], [29.0875, 41.1753]] },
        region: 'İstanbul',
        category: 'Gastronomi',
        guideId: guides[0].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
    await prisma.route.create({
      data: {
        title: 'Beyoğlu Kültür ve Sanat Turu',
        description: 'İstiklal Caddesi, Galata Kulesi, müzeler ve sanat galerileri. Modern İstanbul\'u keşfedin.',
        geoJson: { type: 'LineString', coordinates: [[28.9744, 41.0297], [28.9784, 41.0351]] },
        region: 'İstanbul',
        category: 'Kültür',
        guideId: guides[0].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
  );

  // Zeynep Kaya'nın rotaları (Kapadokya)
  routes.push(
    await prisma.route.create({
      data: {
        title: 'Kapadokya Balon Turu ve Vadiler',
        description: 'Gün doğumunda sıcak hava balonu turu, ardından Göreme Açık Hava Müzesi ve peri bacaları gezisi.',
        geoJson: { type: 'Point', coordinates: [34.8283, 38.6431] },
        region: 'Nevşehir',
        category: 'Doğa',
        guideId: guides[1].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
    await prisma.route.create({
      data: {
        title: 'Yeraltı Şehirleri Keşfi',
        description: 'Derinkuyu ve Kaymaklı yeraltı şehirlerini keşfedin. Antik dönem mühendislik harikası.',
        geoJson: { type: 'Point', coordinates: [34.7333, 38.3833] },
        region: 'Nevşehir',
        category: 'Tarihi',
        guideId: guides[1].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
    await prisma.route.create({
      data: {
        title: 'Kapadokya Şarap Rotası',
        description: 'Bölgenin ünlü şarap mahzenlerini ziyaret edin. Tadım ve yerel lezzetler dahil.',
        geoJson: { type: 'Point', coordinates: [34.8553, 38.6369] },
        region: 'Nevşehir',
        category: 'Gastronomi',
        guideId: guides[1].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
  );

  // Mehmet Demir'in rotaları (Ege)
  routes.push(
    await prisma.route.create({
      data: {
        title: 'Efes Antik Kenti Turu',
        description: 'Dünyanın en iyi korunmuş antik kentlerinden Efes\'i profesyonel rehberlik eşliğinde gezin.',
        geoJson: { type: 'Point', coordinates: [27.3408, 37.9392] },
        region: 'İzmir',
        category: 'Tarihi',
        guideId: guides[2].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
    await prisma.route.create({
      data: {
        title: 'Şirince Köyü ve Şarap Tadımı',
        description: 'Otantik Şirince köyünde gezinti, ev yapımı şaraplar ve yerel ürünler tadımı.',
        geoJson: { type: 'Point', coordinates: [27.4486, 37.9456] },
        region: 'İzmir',
        category: 'Gastronomi',
        guideId: guides[2].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
    await prisma.route.create({
      data: {
        title: 'Pamukkale Travertenleri',
        description: 'Beyaz cennet Pamukkale travertenleri ve Hierapolis antik kenti gezisi.',
        geoJson: { type: 'Point', coordinates: [29.1211, 37.9203] },
        region: 'Denizli',
        category: 'Doğa',
        guideId: guides[2].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
  );

  // Ayşe Çelik'in rotaları (Antalya)
  routes.push(
    await prisma.route.create({
      data: {
        title: 'Köprülü Kanyon Rafting',
        description: 'Adrenalin dolu rafting macerası. Tüm ekipman ve öğle yemeği dahil. Deneyim gerekmez.',
        geoJson: { type: 'Point', coordinates: [31.1656, 37.2153] },
        region: 'Antalya',
        category: 'Macera',
        guideId: guides[3].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
    await prisma.route.create({
      data: {
        title: 'Likya Yolu Trekking',
        description: '2 günlük Likya Yolu trekking turu. Kamp, yemek ve rehberlik dahil.',
        geoJson: { type: 'LineString', coordinates: [[29.6442, 36.5667], [29.7167, 36.6333]] },
        region: 'Antalya',
        category: 'Doğa',
        guideId: guides[3].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
    await prisma.route.create({
      data: {
        title: 'Antalya Şehir Turu',
        description: 'Kaleiçi, Düden Şelalesi ve antik limanı kapsayan şehir turu.',
        geoJson: { type: 'Point', coordinates: [30.7133, 36.8969] },
        region: 'Antalya',
        category: 'Şehir Turu',
        guideId: guides[3].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
  );

  // Can Öztürk'ün rotaları (Karadeniz)
  routes.push(
    await prisma.route.create({
      data: {
        title: 'Ayder Yaylası Doğa Turu',
        description: 'Yeşilin her tonunu göreceğiniz Ayder Yaylası, şelaleler ve termal kaynaklar turu.',
        geoJson: { type: 'Point', coordinates: [40.9667, 41.1333] },
        region: 'Rize',
        category: 'Doğa',
        guideId: guides[4].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
    await prisma.route.create({
      data: {
        title: 'Kaçkar Dağları Trekking',
        description: '3 günlük Kaçkar Dağları trekking macerası. Kamp, yemek ve ekipman dahil.',
        geoJson: { type: 'Point', coordinates: [41.1333, 40.8333] },
        region: 'Rize',
        category: 'Macera',
        guideId: guides[4].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
    await prisma.route.create({
      data: {
        title: 'Uzungöl ve Çay Bahçeleri',
        description: 'Uzungöl\'ün eşsiz manzarası ve çay bahçeleri gezisi. Yerel kahvaltı dahil.',
        geoJson: { type: 'Point', coordinates: [40.3000, 40.6167] },
        region: 'Trabzon',
        category: 'Doğa',
        guideId: guides[4].id,
        isPublished: true,
        mediaUrls: [],
      },
    }),
  );

  console.log(`✅ ${routes.length} routes created`);

  // Gönderiler oluştur
  const posts = [];
  
  posts.push(
    await prisma.post.create({
      data: {
        content: 'Bugün harika bir grup ile Sultanahmet\'i gezdik! Ayasofya\'nın ihtişamı her zaman büyülüyor. 🕌',
        userId: guides[0].id,
        mediaUrls: [],
      },
    }),
    await prisma.post.create({
      data: {
        content: 'Kapadokya\'da gün doğumu balon turu muhteşemdi! Peri bacalarının üzerinde uçmak tarif edilemez bir duygu. 🎈',
        userId: guides[1].id,
        mediaUrls: [],
      },
    }),
    await prisma.post.create({
      data: {
        content: 'Efes Antik Kenti\'nde yürümek zamanda yolculuk yapmak gibi. Her taş bir hikaye anlatıyor. 🏛️',
        userId: guides[2].id,
        mediaUrls: [],
      },
    }),
    await prisma.post.create({
      data: {
        content: 'İstanbul gezim harikaydı! Ahmet bey çok bilgili bir rehber, herkese tavsiye ederim. 👍',
        userId: tourists[0].id,
        mediaUrls: [],
      },
    }),
    await prisma.post.create({
      data: {
        content: 'Köprülü Kanyon\'da rafting yaptık, adrenalin dolu bir gündü! Ayşe hanım süper bir rehber. 🚣',
        userId: tourists[4].id,
        mediaUrls: [],
      },
    }),
  );

  console.log(`✅ ${posts.length} posts created`);

  // Yorumlar ekle
  await prisma.comment.create({
    data: {
      content: 'Çok güzel bir tur olmuş, ben de katılmak isterdim!',
      userId: tourists[1].id,
      postId: posts[0].id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Balon turu benim de hayalim, yakında geliyorum! 😊',
      userId: tourists[2].id,
      postId: posts[1].id,
    },
  });

  console.log('✅ Comments created');

  // Takip ilişkileri
  await Promise.all([
    prisma.follow.create({ data: { followerId: tourists[0].id, followingId: guides[0].id } }),
    prisma.follow.create({ data: { followerId: tourists[0].id, followingId: guides[1].id } }),
    prisma.follow.create({ data: { followerId: tourists[1].id, followingId: guides[0].id } }),
    prisma.follow.create({ data: { followerId: tourists[1].id, followingId: guides[2].id } }),
    prisma.follow.create({ data: { followerId: tourists[2].id, followingId: guides[1].id } }),
    prisma.follow.create({ data: { followerId: tourists[2].id, followingId: guides[4].id } }),
    prisma.follow.create({ data: { followerId: tourists[3].id, followingId: guides[2].id } }),
    prisma.follow.create({ data: { followerId: tourists[4].id, followingId: guides[3].id } }),
  ]);

  console.log('✅ Follow relationships created');

  // Değerlendirmeler
  await Promise.all([
    prisma.rating.create({ data: { value: 5, userId: tourists[0].id, routeId: routes[0].id } }),
    prisma.rating.create({ data: { value: 5, userId: tourists[1].id, routeId: routes[0].id } }),
    prisma.rating.create({ data: { value: 4, userId: tourists[2].id, routeId: routes[3].id } }),
    prisma.rating.create({ data: { value: 5, userId: tourists[3].id, routeId: routes[6].id } }),
    prisma.rating.create({ data: { value: 5, userId: tourists[4].id, routeId: routes[9].id } }),
  ]);

  console.log('✅ Ratings created');

  console.log('\n🎉 Seeding completed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   - 5 Guides created`);
  console.log(`   - 5 Tourists created`);
  console.log(`   - ${routes.length} Routes created`);
  console.log(`   - ${posts.length} Posts created`);
  console.log(`   - Comments, follows, and ratings added`);
  console.log('\n🔐 Login credentials:');
  console.log('   Email: ahmet.yilmaz@example.com (or any other user)');
  console.log('   Password: password123\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
