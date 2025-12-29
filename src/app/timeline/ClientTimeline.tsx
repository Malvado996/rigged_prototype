"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PostCard } from "../components/PostCard";
import { CreatePostModal } from "../components/CreatePostModal";
import { Post } from "../../types/post";

interface ClientTimelineProps {
    initialPosts: Post[];
}

export function ClientTimeline({ initialPosts }: ClientTimelineProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="space-y-8">
                {initialPosts.length === 0 ? (
                    <p className="text-center text-muted-foreground text-lg">
                        No posts yet — be the first to share from the trail! 🛻
                    </p>
                ) : (
                    initialPosts.map((post) => <PostCard key={post.id} post={post} />)
                )}
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-24 right-6 z-50 rounded-full bg-primary p-5 shadow-2xl transition-all hover:scale-110 active:scale-95"
                aria-label="Create new post"
            >
                <Plus className="h-10 w-10 text-primary-foreground" />
            </button>

            {/* Modal */}
            <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}