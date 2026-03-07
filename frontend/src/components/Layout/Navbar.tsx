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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🧭</span>
            <span className="text-2xl font-bold text-primary-600">GeoGuide</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {user ? (
              <>
                <Link href="/feed" className="text-gray-700 hover:text-primary-600 font-medium transition">
                  Ana Sayfa
                </Link>
                <Link href="/routes" className="text-gray-700 hover:text-primary-600 font-medium transition">
                  Rotalar
                </Link>
                {(user.role === 'GUIDE' || user.role === 'VERIFIED_GUIDE') && (
                  <Link href="/guide/dashboard" className="text-gray-700 hover:text-primary-600 font-medium transition">
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-4 pl-4 border-l">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 font-medium transition"
                  >
                    Çıkış
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/routes" className="text-gray-700 hover:text-primary-600 font-medium transition">
                  Rotalar
                </Link>
                <Link href="/auth/login" className="text-gray-700 hover:text-primary-600 font-medium transition">
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary"
                >
                  Ücretsiz Kayıt Ol
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
