'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Layout/Navbar';
import api from '@/lib/api';

export default function CreateRoute() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    region: '',
    category: '',
    price: 0,
    geoJson: {},
    isPublished: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/routes', formData);
      router.push('/guide/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Rota oluşturulamadı');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Yeni Rota Oluştur</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Rota Başlığı *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Örn: İstanbul Tarihi Yarımada Turu"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Açıklama *</label>
              <textarea
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={5}
                placeholder="Rotanız hakkında detaylı bilgi verin..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bölge *</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Örn: İstanbul"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Kategori *</label>
                <select
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Seçiniz</option>
                  <option value="Tarihi">Tarihi</option>
                  <option value="Doğa">Doğa</option>
                  <option value="Kültür">Kültür</option>
                  <option value="Gastronomi">Gastronomi</option>
                  <option value="Macera">Macera</option>
                  <option value="Şehir Turu">Şehir Turu</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Fiyat (₺) *</label>
              <input
                type="number"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="0"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                required
              />
              <p className="text-sm text-gray-500 mt-1">Ücretsiz rotalar için 0 yazabilirsiniz</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Harita</label>
              <div className="border-2 border-dashed rounded-lg h-64 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-3">🗺️</div>
                  <p className="text-gray-500">Harita entegrasyonu yakında eklenecek</p>
                  <p className="text-sm text-gray-400 mt-1">GeoJSON formatında rota bilgisi</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                />
                <span className="text-gray-700">Rotayı hemen yayınla</span>
              </label>
              <p className="text-sm text-gray-500 ml-6">
                İşaretlenmezse taslak olarak kaydedilir
              </p>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition font-medium"
              >
                {loading ? 'Oluşturuluyor...' : 'Rotayı Oluştur'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
