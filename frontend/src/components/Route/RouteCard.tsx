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
    <Link href={`/routes/${route.id}`}>
      <div className="card overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full">
        {/* Image Section */}
        <div className="relative h-56 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 overflow-hidden">
          {route.mediaUrls.length > 0 ? (
            <div className="w-full h-full bg-gray-300"></div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-7xl">🗺️</span>
            </div>
          )}
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-xl font-bold text-primary-600">{route.price} ₺</span>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">{route.category}</span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              📍 {route.region}
            </span>
            {route._count && route._count.ratings > 0 && (
              <span className="text-sm text-amber-500 flex items-center gap-1">
                ⭐ {route._count.ratings}
              </span>
            )}
          </div>

          <h3 className="font-bold text-xl mb-2 line-clamp-1 text-gray-900">
            {route.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {route.description}
          </p>

          {/* Guide Info */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">
                  {route.guide.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                  {route.guide.username}
                  {route.guide.isVerified && (
                    <span className="text-blue-500" title="Doğrulanmış Rehber">✓</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">Profesyonel Rehber</p>
              </div>
            </div>
            
            {route._count && (
              <div className="text-right">
                <p className="text-xs text-gray-500">{route._count.purchases} satış</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
