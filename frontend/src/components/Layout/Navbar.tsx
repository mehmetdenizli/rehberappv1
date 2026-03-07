'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            GeoGuide
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link href="/feed" className="text-gray-700 hover:text-primary-600">
                  Ana Sayfa
                </Link>
                <Link href="/routes" className="text-gray-700 hover:text-primary-600">
                  Rotalar
                </Link>
                {(user.role === 'GUIDE' || user.role === 'VERIFIED_GUIDE') && (
                  <Link href="/guide/dashboard" className="text-gray-700 hover:text-primary-600">
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-gray-700">{user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Çıkış
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/routes" className="text-gray-700 hover:text-primary-600">
                  Rotalar
                </Link>
                <Link href="/auth/login" className="text-gray-700 hover:text-primary-600">
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
