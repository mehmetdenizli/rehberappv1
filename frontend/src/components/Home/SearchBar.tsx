'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    region: '',
    category: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.region) params.append('region', searchData.region);
    if (searchData.category) params.append('category', searchData.category);
    router.push(`/routes?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nereye gitmek istiyorsunuz?
          </label>
          <input
            type="text"
            placeholder="Şehir veya bölge"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            value={searchData.region}
            onChange={(e) => setSearchData({ ...searchData, region: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ne tür bir deneyim?
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            value={searchData.category}
            onChange={(e) => setSearchData({ ...searchData, category: e.target.value })}
          >
            <option value="">Tüm Kategoriler</option>
            <option value="Tarihi">Tarihi Yerler</option>
            <option value="Doğa">Doğa Turları</option>
            <option value="Kültür">Kültür Turları</option>
            <option value="Gastronomi">Gastronomi</option>
            <option value="Macera">Macera</option>
            <option value="Şehir Turu">Şehir Turu</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
          >
            🔍 Ara
          </button>
        </div>
      </form>
    </div>
  );
}
