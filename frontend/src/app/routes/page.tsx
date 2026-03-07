'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [filters, setFilters] = useState({
    region: '',
    category: '',
    maxPrice: '',
  });

  useEffect(() => {
    fetchRoutes();
  }, [filters]);

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
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary-600">Rotalar</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Bölge"
              className="border rounded-lg px-4 py-2"
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
            />
            <input
              type="text"
              placeholder="Kategori"
              className="border rounded-lg px-4 py-2"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max Fiyat"
              className="border rounded-lg px-4 py-2"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {routes.map((route: any) => (
            <div key={route.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{route.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{route.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-bold">{route.price} ₺</span>
                  <span className="text-sm text-gray-500">{route.region}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
