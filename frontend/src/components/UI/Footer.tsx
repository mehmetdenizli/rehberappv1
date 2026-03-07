import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GeoGuide</h3>
            <p className="text-gray-400">
              Yerel rehberlerle bağlan, harika rotalar keşfet
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Keşfet</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/routes" className="text-gray-400 hover:text-white">
                  Rotalar
                </Link>
              </li>
              <li>
                <Link href="/feed" className="text-gray-400 hover:text-white">
                  Sosyal Feed
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-400 hover:text-white">
                  Rehberler
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Rehber Ol</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/guide/dashboard" className="text-gray-400 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/guide/create-route" className="text-gray-400 hover:text-white">
                  Rota Oluştur
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-gray-400 hover:text-white">
                  Kayıt Ol
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Destek</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Yardım Merkezi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  İletişim
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Gizlilik Politikası
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 GeoGuide. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
