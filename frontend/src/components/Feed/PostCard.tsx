'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface PostCardProps {
  post: {
    id: string;
    content: string;
    mediaUrls: string[];
    user: {
      username: string;
      avatar?: string;
      isVerified: boolean;
    };
    ratings?: any[];
    _count: {
      comments: number;
      ratings: number;
    };
    comments?: any[];
    createdAt: string;
  };
  onUpdate?: () => void;
}

export default function PostCard({ post, onUpdate }: PostCardProps) {
  const [liked, setLiked] = useState(post.ratings && post.ratings.length > 0);
  const [likeCount, setLikeCount] = useState(post._count.ratings);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [submitting, setSubmitting] = useState(false);

  const handleLike = async () => {
    try {
      const response = await api.post(`/posts/${post.id}/like`);
      setLiked(response.data.liked);
      setLikeCount(prev => response.data.liked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || submitting) return;

    setSubmitting(true);
    try {
      const response = await api.post(`/posts/${post.id}/comment`, {
        content: commentText
      });
      setComments([response.data, ...comments]);
      setCommentText('');
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-primary-100 rounded-full mr-3 flex items-center justify-center">
          <span className="text-primary-600 font-semibold text-lg">
            {post.user.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="font-semibold">{post.user.username}</h3>
            {post.user.isVerified && (
              <span className="ml-2 text-blue-500 text-lg">✓</span>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      <p className="mb-4 text-gray-800 whitespace-pre-wrap">{post.content}</p>

      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {post.mediaUrls.map((url, idx) => (
            <div key={idx} className="bg-gray-200 h-48 rounded-lg"></div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-gray-600 border-t pt-3 mb-3">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1 hover:text-primary-600 transition ${liked ? 'text-primary-600 font-semibold' : ''}`}
        >
          <span className="text-xl">{liked ? '👍' : '👍🏻'}</span>
          <span>{likeCount}</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 hover:text-primary-600 transition"
        >
          <span className="text-xl">💬</span>
          <span>{post._count.comments + comments.length}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-primary-600 transition">
          <span className="text-xl">🔗</span>
          <span>Paylaş</span>
        </button>
      </div>

      {showComments && (
        <div className="border-t pt-4">
          <form onSubmit={handleComment} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Yorum yaz..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={submitting}
              />
              <button
                type="submit"
                disabled={!commentText.trim() || submitting}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition"
              >
                {submitting ? '...' : 'Gönder'}
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-semibold text-sm">
                    {comment.user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{comment.user.username}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
