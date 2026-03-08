'use client';

import Link from 'next/link';

interface RouteCardProps {
  route: {
    id: string;
    title: string;
    description: string;
    region: string;
    category: string;
    mediaUrls: string[];
    guide: {
      id: string;
      username: string;
      isVerified: boolean;
    };
    _count?: {
      ratings: number;
    };
  };
}

export default function RouteCard({ route }: RouteCardProps) {
  return (
    <div className="card overflow-hidden hover:scale-[1.02] transition-all duration-300 h-full">
      {/* Image Section */}
      <Link href={`/routes/${route.id}`}>
        <div className="relative h-56 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 overflow-hidden cursor-pointer">
          {route.mediaUrls.length > 0 ? (
            <div className="w-full h-full bg-gray-300"></div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-7xl">🗺️</span>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">{route.category}</span>
          </div>
        </div>
      </Link>
      
      {/* Content Section */}
      <div className="p-5">
        <Link href={`/routes/${route.id}`}>
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

          <h3 className="font-bold text-xl mb-2 line-clamp-1 text-gray-900 cursor-pointer hover:text-primary-600 transition">
            {route.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {route.description}
          </p>
        </Link>

        {/* Guide Info & Contact Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link href={`/profile/${route.guide.id}`} className="flex items-center gap-2 hover:opacity-80 transition">
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
          </Link>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              // TODO: Mesajlaşma sistemi eklendiğinde burası güncellenecek
              alert(`${route.guide.username} ile iletişime geçmek için mesajlaşma özelliği yakında eklenecek!`);
            }}
            className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
          >
            <span>💬</span>
            <span>İletişim</span>
          </button>
        </div>
      </div>
    </div>
  );
}
