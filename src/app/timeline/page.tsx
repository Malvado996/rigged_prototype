import { currentUser } from "@clerk/nextjs/server";
import { PostCard } from "../components/PostCard";

const fakePosts = [
    {
        id: "1",
        type: "community" as const,
        author: "Alex Rivera",
        avatar: "",
        username: "alexoverland",
        badge: "Convoy Leader",
        title: "Who's joining the Moab convoy this weekend?",
        content: "Epic red rock lines ahead. Meeting at the trailhead Saturday 7am. 4 spots left in the group!",
        image: "/placeholder.jpg", // string or undefined — not boolean
        upvotes: 42,
        comments: 18,
        timeAgo: "2h ago",
    },
    {
        id: "2",
        type: "forum" as const,
        author: "Jordan Mechner",
        avatar: "",
        username: "jordantech",
        badge: "How-To Hero",
        title: "Best roof rack setup for Defender 110?",
        content: "Looking for recommendations on load rating, wind noise, and easy removal. Currently running Frontrunner but thinking about switching.",
        upvotes: 28,
        comments: 15,
        timeAgo: "5h ago",
    },
    {
        id: "3",
        type: "marketplace" as const,
        author: "Sam Torres",
        avatar: "",
        username: "samflips",
        title: "For Sale: ARB Awning + Side Walls - Like New",
        content: "Used on 3 trips only. 2500x2500 with full side walls and mounting brackets. No tears, perfect condition.",
        image: "/placeholder.jpg",
        price: 450,
        upvotes: 12,
        comments: 8,
        timeAgo: "1d ago",
    },
];

export default async function TimelinePage() {
    const user = await currentUser();

    if (!user) {
        return null; // Redirect handled by middleware
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Timeline</h1>

            <div className="space-y-6">
                {fakePosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* Floating New Post Button */}
            <button className="fixed bottom-20 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center text-3xl font-light hover:bg-primary/90 transition-all z-40">
                +
            </button>
        </div>
    );
}