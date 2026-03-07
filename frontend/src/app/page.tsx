export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-primary-600">
            GeoGuide
          </h1>
          <p className="text-xl text-gray-600">
            Yerel rehberlerle bağlan, harika rotalar keşfet
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">🗺️ Rotalar</h2>
            <p className="text-gray-600">
              Doğrulanmış rehberler tarafından oluşturulan özel rotaları keşfedin
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">📱 Sosyal</h2>
            <p className="text-gray-600">
              Deneyimlerinizi paylaşın, diğer gezginlerle etkileşime geçin
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">💼 Rehber Ol</h2>
            <p className="text-gray-600">
              Bilginizi paylaşın ve gelir elde edin
            </p>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition">
            Hemen Başla
          </button>
        </div>
      </div>
    </main>
  )
}
