import { supabase } from "@/lib/supabase";
import { PostCard } from "../components/PostCard";
import { OutingCard } from "../components/OutingCard";
import { Post, PostFromDB } from "@/types/post";

const mockOuting = {
    id: 1,
    title: "Moab Easter Run",
    date: "2026-04-05",
    location: "Moab, UT",
    rsvps: 18,
    gallery: [
        "https://via.placeholder.com/400x400?text=Trail+1",
        "https://via.placeholder.com/400x400?text=Campfire",
        "https://via.placeholder.com/400x400?text=Sunset+Rig",
        "https://via.placeholder.com/400x400?text=Group+Shot",
    ],
};

async function getPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error || !data) {
        console.error("Error loading posts:", error);
        return [];
    }

    // Map DB shape to display shape
    return data.map((dbPost: PostFromDB): Post => ({
        id: dbPost.id,
        userId: dbPost.user_id,
        type: dbPost.type,
        content: dbPost.content || "",
        images: dbPost.images,
        upvotes: dbPost.upvotes,
        created_at: dbPost.created_at,
        is_pro: dbPost.is_pro
    }));
}

export default async function TimelinePage() {
    const posts = await getPosts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Timeline</h1>

            <div className="space-y-8">
                {/* Featured Outing Card */}
                <OutingCard outing={mockOuting} />

                {/* Real Posts from DB */}
                {posts.length === 0 ? (
                    <p className="text-center text-muted-foreground text-lg">
                        No posts yet — be the first to share from the trail! 🛻
                    </p>
                ) : (
                    posts.map((post) => <PostCard key={post.id} post={post} />)
                )}
            </div>
        </div>
    );
}