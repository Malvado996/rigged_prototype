import { supabase } from "@/lib/supabase";
import { PostCard } from "../components/PostCard";

async function getPosts() {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    return data || [];
}

export default async function TimelinePage() {
    const posts = await getPosts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Timeline</h1>

            <div className="space-y-8">
                {posts.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                        No posts yet — be the first to post from the trail! 🛻
                    </p>
                ) : (
                    posts.map((post) => <PostCard key={post.id} post={post} />)
                )}
            </div>
        </div>
    );
}