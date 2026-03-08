'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'TOURIST' as 'TOURIST' | 'GUIDE',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    try {
      await register(formData.email, formData.username, formData.password, formData.role);
      router.push('/feed');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Kayıt başarısız. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">
            GeoGuide'a Katıl
          </h1>
          <p className="text-gray-600">Hemen ücretsiz hesap oluştur, keşfetmeye başla</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Hesap Türü Seçimi */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center">Hesap Türünü Seçin</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Turist Kartı */}
              <div
                onClick={() => setFormData({ ...formData, role: 'TOURIST' })}
                className={`cursor-pointer border-2 rounded-xl p-6 transition-all ${
                  formData.role === 'TOURIST'
                    ? 'border-primary-600 bg-primary-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-primary-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="role"
                    value="TOURIST"
                    checked={formData.role === 'TOURIST'}
                    onChange={() => setFormData({ ...formData, role: 'TOURIST' })}
                    className="mt-1 w-5 h-5 text-primary-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">🎒</span>
                      <h3 className="text-2xl font-bold text-gray-900">Turist</h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">
                      Rotaları keşfet, deneyimlerini paylaş ve yerel rehberlerle bağlan
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Tüm rotaları görüntüle
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Rehberleri takip et
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Yorum ve değerlendirme yap
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Rota satın al
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Rehber Kartı */}
              <div
                onClick={() => setFormData({ ...formData, role: 'GUIDE' })}
                className={`cursor-pointer border-2 rounded-xl p-6 transition-all ${
                  formData.role === 'GUIDE'
                    ? 'border-primary-600 bg-primary-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-primary-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="role"
                    value="GUIDE"
                    checked={formData.role === 'GUIDE'}
                    onChange={() => setFormData({ ...formData, role: 'GUIDE' })}
                    className="mt-1 w-5 h-5 text-primary-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">🧭</span>
                      <h3 className="text-2xl font-bold text-gray-900">Rehber</h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">
                      Bilgini paylaş, özel rotalar oluştur ve gelir elde et
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Özel rotalar oluştur
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Fiyatlandırma yap
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Gelir elde et
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Dashboard ve analitik
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Alanları */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">E-posta *</label>
              <input
                type="email"
                className="input-field"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Kullanıcı Adı *</label>
              <input
                type="text"
                className="input-field"
                placeholder="kullaniciadi"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Şifre *</label>
              <input
                type="password"
                className="input-field"
                placeholder="En az 6 karakter"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Şifre Tekrar *</label>
              <input
                type="password"
                className="input-field"
                placeholder="Şifrenizi tekrar girin"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary text-lg py-4"
          >
            Hesap Oluştur
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Zaten hesabın var mı?{' '}
          <Link href="/auth/login" className="text-primary-600 hover:underline font-semibold">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
