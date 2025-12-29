import { Heart, MessageCircle } from "lucide-react";
import { Post } from "@/types/post";

export function PostCard({ post }: { post: Post }) {
    const { content, images, upvotes, created_at } = post;

    const timeAgo = new Date(created_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    return (
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            {/* User header placeholder — we'll add real user data later */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                    U
                </div>
                <div>
                    <div className="font-semibold">You</div>
                    <div className="text-sm text-muted-foreground">{timeAgo}</div>
                </div>
            </div>

            {/* Content */}
            <p className="mb-6 text-lg">{content}</p>

            {/* Images */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-6 rounded-xl overflow-hidden">
                    {images.map((url, i) => (
                        <img
                            key={i}
                            src={url}
                            alt={`Post image ${i + 1}`}
                            className="object-cover w-full h-64 rounded-lg"
                        />
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-8 text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-primary transition">
                    <Heart className="h-5 w-5" />
                    <span>{upvotes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-primary transition">
                    <MessageCircle className="h-5 w-5" />
                    <span>Comment</span>
                </button>
            </div>
        </div>
    );
}