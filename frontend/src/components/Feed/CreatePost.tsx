'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface CreatePostProps {
  onPostCreated?: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/posts', { content, mediaUrls: [] });
      setContent('');
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gönderi oluşturulamadı');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ne düşünüyorsun?"
          className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows={3}
          disabled={loading}
        />
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2">
            <button type="button" className="text-gray-600 hover:text-primary-600 text-sm">
              📷 Fotoğraf
            </button>
            <button type="button" className="text-gray-600 hover:text-primary-600 text-sm">
              🎥 Video
            </button>
          </div>
          <button
            type="submit"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition"
            disabled={!content.trim() || loading}
          >
            {loading ? 'Paylaşılıyor...' : 'Paylaş'}
          </button>
        </div>
      </form>
    </div>
  );
}
