'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push('/');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href={user ? "/feed" : "/"} className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-3xl">🧭</span>
            <span className="text-2xl font-bold text-primary-600">GeoGuide</span>
          </Link>

          {/* Desktop Menu */}
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
                
                {/* User Menu Dropdown */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 pl-4 border-l hover:opacity-80 transition"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-gray-900 font-medium text-sm">{user.username}</div>
                      <div className="text-gray-500 text-xs">
                        {user.role === 'GUIDE' || user.role === 'VERIFIED_GUIDE' ? 'Rehber' : 'Turist'}
                      </div>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                      <Link
                        href={`/profile/${user.id}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                      >
                        <span className="text-xl">👤</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Profilim</div>
                          <div className="text-xs text-gray-500">Profili görüntüle</div>
                        </div>
                      </Link>

                      {(user.role === 'GUIDE' || user.role === 'VERIFIED_GUIDE') && (
                        <>
                          <Link
                            href="/guide/dashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                          >
                            <span className="text-xl">📊</span>
                            <div>
                              <div className="text-sm font-medium text-gray-900">Dashboard</div>
                              <div className="text-xs text-gray-500">İstatistikler ve rotalar</div>
                            </div>
                          </Link>
                          <Link
                            href="/guide/create-route"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                          >
                            <span className="text-xl">➕</span>
                            <div>
                              <div className="text-sm font-medium text-gray-900">Rota Oluştur</div>
                              <div className="text-xs text-gray-500">Yeni rota ekle</div>
                            </div>
                          </Link>
                        </>
                      )}

                      <div className="border-t border-gray-100 my-2"></div>

                      <Link
                        href="/settings"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                      >
                        <span className="text-xl">⚙️</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Ayarlar</div>
                          <div className="text-xs text-gray-500">Hesap ayarları</div>
                        </div>
                      </Link>

                      <div className="border-t border-gray-100 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition w-full text-left"
                      >
                        <span className="text-xl">🚪</span>
                        <div>
                          <div className="text-sm font-medium text-red-600">Çıkış Yap</div>
                          <div className="text-xs text-gray-500">Hesaptan çık</div>
                        </div>
                      </button>
                    </div>
                  )}
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
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            {user ? (
              <div className="space-y-2">
                {/* User Info */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-lg">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user.username}</div>
                    <div className="text-sm text-gray-500">
                      {user.role === 'GUIDE' || user.role === 'VERIFIED_GUIDE' ? 'Rehber' : 'Turist'}
                    </div>
                  </div>
                </div>

                <Link
                  href="/feed"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Ana Sayfa
                </Link>
                <Link
                  href="/routes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Rotalar
                </Link>
                {(user.role === 'GUIDE' || user.role === 'VERIFIED_GUIDE') && (
                  <>
                    <Link
                      href="/guide/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/guide/create-route"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                    >
                      Rota Oluştur
                    </Link>
                  </>
                )}
                <Link
                  href={`/profile/${user.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Profilim
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Ayarlar
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/routes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Rotalar
                </Link>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition"
                >
                  Ücretsiz Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
