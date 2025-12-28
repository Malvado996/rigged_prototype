"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { CreatePostModal } from "../components/CreatePostModal";

export default function TimelinePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative min-h-screen pb-40">  {/* pb-32 for bottom nav + button space */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Timeline</h1>

                {/* Placeholder for feed — we'll fill with real posts soon */}
                <div className="space-y-8">
                    <p className="text-center text-muted-foreground text-lg">
                        Your overland feed will explode once you post from the trail 🚧🛻
                    </p>
                </div>
            </div>

            {/* Floating Create Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-28 right-6 z-50 rounded-full bg-primary p-5 shadow-2xl transition-all hover:scale-110 active:scale-95"
                aria-label="Create new post"
            >
                <Plus className="h-10 w-10 text-primary-foreground" />
            </button>

            {/* The Modal Itself */}
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}