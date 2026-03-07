import Link from 'next/link';
import Navbar from '@/components/Layout/Navbar';
import SearchBar from '@/components/Home/SearchBar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Türkiye'nin En İyi <br />
              <span className="text-accent-100">Turist Rehberleri</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-primary-100">
              Yerel rehberlerle bağlan, unutulmaz deneyimler yaşa
            </p>
            
            <SearchBar />
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link href="/auth/register" className="btn-primary text-lg px-10 py-4">
                Ücretsiz Kayıt Ol
              </Link>
              <Link href="/routes" className="btn-secondary bg-white/10 border-white text-white hover:bg-white/20 text-lg px-10 py-4">
                Rotaları İncele
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Neden GeoGuide?</h2>
            <p className="text-xl text-gray-600">Türkiye'nin en kapsamlı rehber platformu</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🗺️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Özel Rotalar</h3>
              <p className="text-gray-600 leading-relaxed">
                Doğrulanmış profesyonel rehberler tarafından hazırlanmış, detaylı ve güvenilir rotalar
              </p>
            </div>

            <div className="card p-8 text-center hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Güvenilir Rehberler</h3>
              <p className="text-gray-600 leading-relaxed">
                Tüm rehberlerimiz kimlik doğrulaması ve referans kontrolünden geçer
              </p>
            </div>

            <div className="card p-8 text-center hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">En İyi Fiyat</h3>
              <p className="text-gray-600 leading-relaxed">
                Rekabetçi fiyatlar ve şeffaf ücretlendirme ile bütçenize uygun seçenekler
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">1,250+</div>
              <p className="text-gray-600 text-lg">Aktif Kullanıcı</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">580+</div>
              <p className="text-gray-600 text-lg">Özel Rota</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">320+</div>
              <p className="text-gray-600 text-lg">Doğrulanmış Rehber</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">81</div>
              <p className="text-gray-600 text-lg">Şehir</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Rehber misiniz?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Bilginizi paylaşın, deneyiminizi paraya çevirin. Binlerce gezgine ulaşın.
          </p>
          <Link href="/auth/register" className="inline-block bg-white text-primary-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
            Rehber Olarak Kayıt Ol
          </Link>
        </div>
      </section>
    </div>
  )
}
