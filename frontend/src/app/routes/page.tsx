'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Navbar from '@/components/Layout/Navbar';
import RouteCard from '@/components/Route/RouteCard';

export default function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    region: '',
    category: '',
    maxPrice: '',
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.region) params.append('region', filters.region);
      if (filters.category) params.append('category', filters.category);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const response = await api.get(`/routes?${params}`);
      setRoutes(response.data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    fetchRoutes();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Rotaları Keşfet</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Bölge (örn: İstanbul)"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
            />
            <input
              type="text"
              placeholder="Kategori (örn: Tarihi)"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max Fiyat"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
            <button
              onClick={handleSearch}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Ara
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Rotalar yükleniyor...</div>
          </div>
        ) : routes.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {routes.map((route: any) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold mb-2">Henüz rota yok</h3>
            <p className="text-gray-600">İlk rotayı oluşturmak için rehber olarak kayıt olun!</p>
          </div>
        )}
      </div>
    </div>
  );
}
