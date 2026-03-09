'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import Navbar from '@/components/Layout/Navbar';

export default function RouteDetailPage() {
  const params = useParams();
  const router = useRouter();
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

  const handleContact = () => {
    // TODO: Mesajlaşma sistemi eklendiğinde burası güncellenecek
    alert(`${route.guide?.username} ile iletişime geçmek için mesajlaşma özelliği yakında eklenecek!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-gray-600">Yükleniyor...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold mb-2">Rota bulunamadı</h3>
            <button
              onClick={() => router.push('/routes')}
              className="mt-4 text-primary-600 hover:underline"
            >
              ← Rotalara Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/routes')}
          className="mb-4 text-gray-600 hover:text-primary-600 flex items-center gap-2 transition"
        >
          <span>←</span>
          <span>Rotalara Dön</span>
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-96 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 flex items-center justify-center text-white">
            {route.mediaUrls && route.mediaUrls.length > 0 ? (
              <div className="w-full h-full bg-gray-300"></div>
            ) : (
              <span className="text-9xl">🗺️</span>
            )}
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-medium">{route.category}</span>
            </div>
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3 text-gray-900">{route.title}</h1>
                <div className="flex gap-3 text-sm">
                  <span className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2">
                    <span>📍</span>
                    <span className="font-medium">{route.region}</span>
                  </span>
                  {route._count && route._count.ratings > 0 && (
                    <span className="bg-amber-50 px-4 py-2 rounded-lg flex items-center gap-2">
                      <span>⭐</span>
                      <span className="font-medium">{route._count.ratings} değerlendirme</span>
                    </span>
                  )}
                </div>
              </div>
              
              {/* Contact Button */}
              <button
                onClick={handleContact}
                className="px-8 py-4 bg-primary-600 text-white text-lg rounded-lg hover:bg-primary-700 transition flex items-center gap-3 shadow-lg hover:shadow-xl"
              >
                <span className="text-2xl">💬</span>
                <span className="font-semibold">Rehberle İletişime Geç</span>
              </button>
            </div>

            {/* Description */}
            <div className="border-t pt-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Rota Hakkında</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{route.description}</p>
            </div>

            {/* Map Placeholder */}
            <div className="border-t pt-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Harita</h2>
              <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                <span className="text-6xl mb-4">🗺️</span>
                <p className="text-gray-500 text-lg">Harita görünümü yakında eklenecek</p>
                <p className="text-gray-400 text-sm mt-2">Google Maps / Mapbox entegrasyonu</p>
              </div>
            </div>

            {/* Guide Info */}
            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Rehber Bilgileri</h2>
              <Link 
                href={`/profile/${route.guide?.id}`}
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold text-2xl">
                    {route.guide?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-xl flex items-center gap-2 text-gray-900">
                    {route.guide?.username}
                    {route.guide?.isVerified && (
                      <span className="text-blue-500 text-2xl" title="Doğrulanmış Rehber">✓</span>
                    )}
                  </p>
                  <p className="text-gray-600 mt-1">Profesyonel Rehber</p>
                  {route.guide?.bio && (
                    <p className="text-gray-500 text-sm mt-2">{route.guide.bio}</p>
                  )}
                </div>
                <div className="text-primary-600">
                  <span className="text-2xl">→</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
