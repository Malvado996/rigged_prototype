import { ThumbsUp } from 'lucide-react';

type Post = {
    id: number;
    author: string;
    avatar: string;
    content: string;
    photos: string[];
    votes: number;
    isPro: boolean;
};

type PostCardProps = {
    post: Post;
};

export function PostCard({ post }: PostCardProps) {
    return (
        <article className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full" />
                <div>
                    <p className="font-semibold">
                        {post.author} {post.isPro && <span className="text-camelSand ml-2">★ Pro</span>}
                    </p>
                </div>
            </div>

            <p className="mb-4">{post.content}</p>

            {post.photos.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {post.photos.map((photo, i) => (
                        <div key={i} className="bg-gray-700 rounded-lg aspect-square" />
                    ))}
                </div>
            )}

            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-camelSand hover:text-camelCream">
                    <ThumbsUp className="w-5 h-5" />
                    <span>{post.votes}</span>
                </button>
            </div>
        </article>
    );
}