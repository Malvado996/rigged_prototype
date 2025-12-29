import { Post } from "@/types/post";  // Adjust path if needed
import { Heart, MessageCircle, Users, MessageSquare, DollarSign, X, Camera } from "lucide-react";

export function PostCard({ post }: { post: Post }) {
    const {
        type,
        userName,
        userAvatar,
        badge,
        content,
        images,
        upvotes,
        comments,
        timeAgo,
    } = post;

    // Your card UI here — use the fields above

    return (
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
            {/* User header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                    {userAvatar}
                </div>
                <div>
                    <div className="font-semibold">{userName}</div>
                    <div className="text-sm text-muted-foreground">{timeAgo}</div>
                </div>
                {badge && (
                    <div className="ml-auto px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                        {badge}
                    </div>
                )}
            </div>

            {/* Content */}
            <p className="mb-4">{content}</p>

            {/* Images grid if any */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {images.map((img, i) => (
                        <img key={i} src={img} alt="" className="rounded-lg object-cover w-full h-64" />
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-primary transition">
                    <Heart className="h-5 w-5" />
                    <span>{upvotes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-primary transition">
                    <MessageCircle className="h-5 w-5" />
                    <span>{comments}</span>
                </button>
            </div>
        </div>
    );
}