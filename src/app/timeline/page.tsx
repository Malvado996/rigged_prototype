import { supabase } from "@/lib/supabase";
import { ClientTimeline } from "./ClientTimeline";
import { Post, PostFromDB } from "@/types/post";

async function getPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error || !data) {
        console.error("Error loading posts:", error);
        return [];
    }

    return data.map((dbPost: PostFromDB): Post => ({
        id: dbPost.id,
        userId: dbPost.user_id,
        type: dbPost.type,
        content: dbPost.content || "",
        images: dbPost.images,
        upvotes: dbPost.upvotes,
        created_at: dbPost.created_at,
    }));
}

export default async function TimelinePage() {
    const posts = await getPosts();

    return (
        <div className="container mx-auto px-4 py-8 pb-32">
            <h1 className="text-3xl font-bold mb-8">Timeline</h1>

            <ClientTimeline initialPosts={posts} />
        </div>
    );
}