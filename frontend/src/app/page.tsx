import Link from 'next/link';
import Navbar from '@/components/Layout/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16 pt-12">
            <h1 className="text-6xl font-bold mb-6 text-primary-600">
              GeoGuide
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Yerel rehberlerle bağlan, harika rotalar keşfet
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
              >
                Hemen Başla
              </Link>
              <Link
                href="/routes"
                className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-50 transition"
              >
                Rotaları Keşfet
              </Link>
            </div>
          </header>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4">🗺️</div>
              <h2 className="text-2xl font-semibold mb-3">Rotalar</h2>
              <p className="text-gray-600">
                Doğrulanmış rehberler tarafından oluşturulan özel rotaları keşfedin
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="text-2xl font-semibold mb-3">Sosyal</h2>
              <p className="text-gray-600">
                Deneyimlerinizi paylaşın, diğer gezginlerle etkileşime geçin
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4">💼</div>
              <h2 className="text-2xl font-semibold mb-3">Rehber Ol</h2>
              <p className="text-gray-600">
                Bilginizi paylaşın ve gelir elde edin
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Neden GeoGuide?</h2>
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <p className="text-primary-100">Aktif Kullanıcı</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <p className="text-primary-100">Rota</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">200+</div>
                <p className="text-primary-100">Rehber</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <p className="text-primary-100">Şehir</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
