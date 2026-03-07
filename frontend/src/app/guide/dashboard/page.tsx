'use client';

import { useState } from 'react';

export default function GuideDashboard() {
  const [stats] = useState({
    totalRoutes: 12,
    totalEarnings: 4500,
    followers: 234,
    avgRating: 4.8,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary-600">Rehber Paneli</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 mb-2">Toplam Rota</h3>
            <p className="text-3xl font-bold text-primary-600">{stats.totalRoutes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 mb-2">Kazanç</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalEarnings} ₺</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 mb-2">Takipçi</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.followers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 mb-2">Ortalama Puan</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.avgRating} ⭐</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Rotalarım</h2>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              + Yeni Rota
            </button>
          </div>
          <div className="text-gray-600 text-center py-8">
            Henüz rota oluşturmadınız
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Son Satışlar</h2>
          <div className="text-gray-600 text-center py-8">
            Henüz satış yok
          </div>
        </div>
      </div>
    </div>
  );
}
