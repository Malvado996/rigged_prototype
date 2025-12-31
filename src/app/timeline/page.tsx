"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { supabase } from "@/lib/supabase";  // or supabase-browser if you have it
import { PostCard } from "@/components/PostCard";
import { CreatePostModal } from "@/components/CreatePostModal";
import { Post } from "@/types/post";

async function getPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error || !data) {
        console.error("Error loading posts:", error);
        return [];
    }

    return data.map((dbPost: any): Post => ({
        id: dbPost.id,
        userId: dbPost.user_id,
        type: dbPost.type,
        content: dbPost.content || "",
        images: dbPost.images || [],
        upvotes: dbPost.upvotes || 0,
        created_at: dbPost.created_at,
        is_pro: dbPost.is_pro || false,
    }));
}

export default function TimelinePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchParams = useSearchParams();

    // Load posts on mount
    useEffect(() => {
        getPosts().then(setPosts);
    }, []);

    // Success toast from Stripe redirect
    useEffect(() => {
        if (searchParams.get("tip_success")) {
            alert("Tip sent successfully! Thank you for supporting the creator 🔥🛻");
            // Clean URL
            window.history.replaceState({}, "", "/timeline");
        }
        if (searchParams.get("tip_cancel")) {
            alert("Tip cancelled — no worries!");
            window.history.replaceState({}, "", "/timeline");
        }
    }, [searchParams]);

    return (
        <div className="relative min-h-screen pb-32">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Timeline</h1>

                <div className="space-y-8">
                    {posts.length === 0 ? (
                        <p className="text-center text-muted-foreground text-lg">
                            No posts yet — be the first to share from the trail! 🛻
                        </p>
                    ) : (
                        posts.map((post) => <PostCard key={post.id} post={post} />)
                    )}
                </div>
            </div>

            {/* Floating + Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-24 right-6 z-50 rounded-full bg-primary p-5 shadow-2xl transition-all hover:scale-110 active:scale-95"
                aria-label="Create new post"
            >
                <Plus className="h-10 w-10 text-primary-foreground" />
            </button>

            {/* Create Post Modal */}
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}