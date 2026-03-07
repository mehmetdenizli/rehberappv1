'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Layout/Navbar';
import api from '@/lib/api';

export default function GuideDashboard() {
  const [stats] = useState({
    totalRoutes: 0,
    totalEarnings: 0,
    followers: 0,
    avgRating: 0,
  });
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRoutes();
  }, []);

  const fetchMyRoutes = async () => {
    try {
      // Bu endpoint backend'de eklenmeli
      const response = await api.get('/routes/my-routes');
      setRoutes(response.data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Rehber Paneli</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Toplam Rota</h3>
              <span className="text-2xl">🗺️</span>
            </div>
            <p className="text-3xl font-bold text-primary-600">{stats.totalRoutes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Kazanç</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.totalEarnings} ₺</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Takipçi</h3>
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.followers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600">Ortalama Puan</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.avgRating || '-'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Rotalarım</h2>
            <Link
              href="/guide/create-route"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              + Yeni Rota
            </Link>
          </div>
          
          {loading ? (
            <div className="text-center py-8 text-gray-600">Yükleniyor...</div>
          ) : routes.length > 0 ? (
            <div className="space-y-4">
              {routes.map((route: any) => (
                <div key={route.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{route.title}</h3>
                      <p className="text-gray-600 text-sm">{route.region} • {route.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">{route.price} ₺</p>
                      <p className="text-sm text-gray-500">
                        {route.isPublished ? '✅ Yayında' : '⏸️ Taslak'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-2">Henüz rota oluşturmadınız</h3>
              <p className="text-gray-600 mb-4">İlk rotanızı oluşturarak kazanmaya başlayın!</p>
              <Link
                href="/guide/create-route"
                className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
              >
                Rota Oluştur
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Son Satışlar</h2>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-600">Henüz satış yok</p>
          </div>
        </div>
      </div>
    </div>
  );
}
