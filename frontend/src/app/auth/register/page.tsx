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
      await register(formData.email, formData.username, formData.password);
      router.push('/feed');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Kayıt başarısız. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary-600">
          GeoGuide
        </h1>
        <h2 className="text-xl font-semibold mb-6">Kayıt Ol</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">E-posta</label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Kullanıcı Adı</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Şifre</label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Şifre Tekrar</label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Hesap Türü</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="TOURIST"
                  checked={formData.role === 'TOURIST'}
                  onChange={(e) => setFormData({ ...formData, role: 'TOURIST' })}
                  className="mr-2"
                />
                Turist
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="GUIDE"
                  checked={formData.role === 'GUIDE'}
                  onChange={(e) => setFormData({ ...formData, role: 'GUIDE' })}
                  className="mr-2"
                />
                Rehber
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Kayıt Ol
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Zaten hesabın var mı?{' '}
          <Link href="/auth/login" className="text-primary-600 hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
