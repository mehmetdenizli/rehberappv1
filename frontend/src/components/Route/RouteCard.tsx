'use client';

import Link from 'next/link';

interface RouteCardProps {
  route: {
    id: string;
    title: string;
    description: string;
    price: number;
    region: string;
    category: string;
    mediaUrls: string[];
    guide: {
      username: string;
      isVerified: boolean;
    };
    _count?: {
      ratings: number;
      purchases: number;
    };
  };
}

export default function RouteCard({ route }: RouteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative">
        {route.mediaUrls.length > 0 ? (
          <div className="w-full h-full bg-gray-300"></div>
        ) : (
          <div className="flex items-center justify-center h-full text-white text-4xl">
            🗺️
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary-600">
          {route.price} ₺
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {route.category}
          </span>
          <span className="text-xs text-gray-500">{route.region}</span>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{route.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{route.description}</p>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-medium flex items-center gap-1">
                {route.guide.username}
                {route.guide.isVerified && <span className="text-blue-500">✓</span>}
              </p>
            </div>
          </div>
          
          <Link
            href={`/routes/${route.id}`}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Detay →
          </Link>
        </div>

        {route._count && (
          <div className="flex gap-4 mt-3 text-xs text-gray-500">
            <span>⭐ {route._count.ratings} değerlendirme</span>
            <span>🛒 {route._count.purchases} satış</span>
          </div>
        )}
      </div>
    </div>
  );
}
