'use client';

import { useState } from 'react';

export default function CreatePost() {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API call will be added
    console.log('Creating post:', content);
    setContent('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ne düşünüyorsun?"
          className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows={3}
        />
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2">
            <button type="button" className="text-gray-600 hover:text-primary-600">
              📷 Fotoğraf
            </button>
            <button type="button" className="text-gray-600 hover:text-primary-600">
              🎥 Video
            </button>
          </div>
          <button
            type="submit"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
            disabled={!content.trim()}
          >
            Paylaş
          </button>
        </div>
      </form>
    </div>
  );
}
