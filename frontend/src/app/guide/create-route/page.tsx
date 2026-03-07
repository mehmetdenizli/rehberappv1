'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/routes', formData);
      router.push('/guide/dashboard');
    } catch (error) {
      console.error('Error creating route:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary-600">Yeni Rota Oluştur</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rota Başlığı</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Açıklama</label>
              <textarea
                className="w-full border rounded-lg px-4 py-2"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Bölge</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Kategori</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Fiyat (₺)</label>
              <input
                type="number"
                className="w-full border rounded-lg px-4 py-2"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Harita</label>
              <div className="border rounded-lg h-64 bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Harita entegrasyonu eklenecek</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
              >
                Rotayı Oluştur
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
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
