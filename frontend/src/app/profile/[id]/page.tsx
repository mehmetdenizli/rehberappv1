'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import Navbar from '@/components/Layout/Navbar';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const [user, setUser] = useState<any>(null);
  const [routes, setRoutes] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'routes' | 'posts'>('routes');

  useEffect(() => {
    fetchUserProfile();
  }, [params.id]);

  const fetchUserProfile = async () => {
    try {
      // Kullanıcı bilgilerini al
      const userResponse = await api.get(`/users/${params.id}`);
      setUser(userResponse.data);

      // Eğer rehberse rotalarını al
      if (userResponse.data.role === 'GUIDE' || userResponse.data.role === 'VERIFIED_GUIDE') {
        const routesResponse = await api.get(`/routes?guideId=${params.id}`);
        setRoutes(routesResponse.data);
      }

      // Postlarını al
      const postsResponse = await api.get(`/posts?userId=${params.id}`);
      setPosts(postsResponse.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = () => {
    alert(`${user.username} ile iletişime geçmek için mesajlaşma özelliği yakında eklenecek!`);
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold mb-2">Kullanıcı bulunamadı</h3>
            <button
              onClick={() => router.push('/feed')}
              className="mt-4 text-primary-600 hover:underline"
            >
              ← Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;
  const isGuide = user.role === 'GUIDE' || user.role === 'VERIFIED_GUIDE';

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"></div>
          
          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
              {/* Avatar */}
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-primary-600 font-bold text-5xl">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                      {user.username}
                      {user.isVerified && (
                        <span className="text-blue-500 text-2xl" title="Doğrulanmış">✓</span>
                      )}
                    </h1>
                    <p className="text-gray-600 mt-1">
                      {isGuide ? '🧭 Profesyonel Rehber' : '🎒 Gezgin'}
                    </p>
                    {user.bio && (
                      <p className="text-gray-700 mt-3 max-w-2xl">{user.bio}</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {isOwnProfile ? (
                      <Link
                        href="/settings"
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                      >
                        Profili Düzenle
                      </Link>
                    ) : (
                      <button
                        onClick={handleContact}
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium flex items-center gap-2"
                      >
                        <span>💬</span>
                        <span>Mesaj Gönder</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-8 mt-6">
                  {isGuide && (
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{routes.length}</div>
                      <div className="text-sm text-gray-600">Rota</div>
                    </div>
                  )}
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
                    <div className="text-sm text-gray-600">Gönderi</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">Takipçi</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">Takip</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        {isGuide && (
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('routes')}
                className={`flex-1 px-6 py-4 font-medium transition ${
                  activeTab === 'routes'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🗺️ Rotalar ({routes.length})
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`flex-1 px-6 py-4 font-medium transition ${
                  activeTab === 'posts'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📱 Gönderiler ({posts.length})
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div>
          {activeTab === 'routes' && isGuide ? (
            routes.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {routes.map((route: any) => (
                  <Link
                    key={route.id}
                    href={`/routes/${route.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <span className="text-6xl">🗺️</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-1">{route.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{route.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">📍 {route.region}</span>
                        <span className="text-gray-500">{route.category}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold mb-2">Henüz rota yok</h3>
                <p className="text-gray-600">
                  {isOwnProfile ? 'İlk rotanı oluştur!' : 'Bu rehber henüz rota oluşturmamış.'}
                </p>
              </div>
            )
          ) : (
            posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post: any) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                    <p className="text-gray-800 mb-4">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👍 {post._count?.ratings || 0}</span>
                      <span>💬 {post._count?.comments || 0}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">Henüz gönderi yok</h3>
                <p className="text-gray-600">
                  {isOwnProfile ? 'İlk gönderini paylaş!' : 'Bu kullanıcı henüz gönderi paylaşmamış.'}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
