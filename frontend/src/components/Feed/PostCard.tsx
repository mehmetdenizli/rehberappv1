'use client';

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
    _count: {
      comments: number;
      ratings: number;
    };
    createdAt: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
        <div>
          <div className="flex items-center">
            <h3 className="font-semibold">{post.user.username}</h3>
            {post.user.isVerified && (
              <span className="ml-2 text-blue-500">✓</span>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString('tr-TR')}
          </p>
        </div>
      </div>

      <p className="mb-4">{post.content}</p>

      {post.mediaUrls.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {post.mediaUrls.map((url, idx) => (
            <div key={idx} className="bg-gray-200 h-48 rounded-lg"></div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-gray-600 border-t pt-3">
        <button className="flex items-center hover:text-primary-600">
          <span className="mr-1">👍</span>
          {post._count.ratings}
        </button>
        <button className="flex items-center hover:text-primary-600">
          <span className="mr-1">💬</span>
          {post._count.comments}
        </button>
        <button className="flex items-center hover:text-primary-600">
          <span className="mr-1">🔗</span>
          Paylaş
        </button>
      </div>
    </div>
  );
}
