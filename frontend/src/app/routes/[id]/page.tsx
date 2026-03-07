'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Navbar from '@/components/Layout/Navbar';

export default function RouteDetailPage() {
  const params = useParams();
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoute();
  }, [params.id]);

  const fetchRoute = async () => {
    try {
      const response = await api.get(`/routes/${params.id}`);
      setRoute(response.data);
    } catch (error) {
      console.error('Error fetching route:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">Rota bulunamadı</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-96 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-6xl">
            🗺️
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{route.title}</h1>
                <div className="flex gap-3 text-sm text-gray-600">
                  <span className="bg-gray-100 px-3 py-1 rounded">{route.category}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded">{route.region}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary-600">{route.price} ₺</div>
                <button className="mt-3 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">
                  Satın Al
                </button>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <h2 className="text-xl font-semibold mb-3">Açıklama</h2>
              <p className="text-gray-700 leading-relaxed">{route.description}</p>
            </div>

            <div className="border-t pt-6 mb-6">
              <h2 className="text-xl font-semibold mb-3">Harita</h2>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Harita görünümü yakında eklenecek</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-3">Rehber</h2>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    {route.guide?.username}
                    {route.guide?.isVerified && <span className="text-blue-500">✓</span>}
                  </p>
                  <p className="text-sm text-gray-600">Profesyonel Rehber</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
