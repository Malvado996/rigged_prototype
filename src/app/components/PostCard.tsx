import { Heart, MessageCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/post";
import { createTipCheckout } from "@/actions/stripe";


export function PostCard({ post }: { post: Post }) {
    const { content, images, upvotes, created_at, is_pro } = post;

    const timeAgo = new Date(created_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    // const handleTip = async () => {
    //     await createTipCheckout(post.id, 500); // $5 tip in cents
    // };

    // return (
    //     <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
    //         {/* User header placeholder */}
    //         <div className="flex items-center gap-4 mb-4">
    //             <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
    //                 U
    //             </div>
    //             <div className="flex-1">
    //                 <div className="font-semibold flex items-center gap-2">
    //                     You
    //                     {is_pro && (
    //                         <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
    //                             Pro Creator
    //                         </span>
    //                     )}
    //                 </div>
    //                 <div className="text-sm text-muted-foreground">{timeAgo}</div>
    //             </div>
    //         </div>

    {/* Content */ }
    <p className="mb-6 text-lg">{content}</p>

    {/* Images */ }
    {
        images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
                {images.map((url, i) => (
                    <img
                        key={i}
                        src={url}
                        alt={`Post image ${i + 1}`}
                        className="object-cover w-full h-64 rounded-lg"
                    />
                ))}
            </div>
        )
    }

    {/* Actions */ }
    <div className="flex items-center justify-between">
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

        {/* Tip Button — only if creator is pro */}
        {is_pro && (
            <Button
                variant="outline"
                size="sm"
            // onClick={() => initiateTip(post.id, 500)}
            >
                <DollarSign className="h-4 w-4 mr-1" />
                Tip Creator
            </Button>
        )}
    </div>
        </div >
    );
}