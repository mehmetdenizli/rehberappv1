'use client';

import { useEffect, useState } from 'react';
import CreatePost from '@/components/Feed/CreatePost';
import PostCard from '@/components/Feed/PostCard';
import Navbar from '@/components/Layout/Navbar';
import api from '@/lib/api';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts/feed');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <CreatePost onPostCreated={handlePostCreated} />

        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-600">Yükleniyor...</div>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post: any) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Henüz gönderi yok</h3>
            <p className="text-gray-600">İlk gönderiyi sen oluştur!</p>
          </div>
        )}
      </div>
    </div>
  );
}
