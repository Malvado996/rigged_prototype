import { PostCard } from './PostCard';
import { OutingCard } from './OutingCard';
import { Post } from '../../types/post';

// Mock data now typed
const mockPosts: Post[] = [
    {
        id: 1,
        type: "community",
        userName: "Alex Rivera",
        userAvatar: "A",
        badge: "Convoy Leader",
        content: "Who's joining the Moab convoy this weekend? Epic red rock lines ahead. Meeting at the trailhead Saturday 7am. 4 spots left in the group!",
        images: [
            "/placeholder1.jpg",
            "/placeholder2.jpg",
        ],
        upvotes: 42,
        comments: 18,
        timeAgo: "2h ago",
    },
    {
        id: 2,
        type: "forum",
        userName: "Jordan Mecher",
        userAvatar: "J",
        badge: "How-To Hero",
        content: "Best roof rack setup for Defender 110? Looking for recommendations on load rating, wind noise, and easy removal. Currently running Frontrunner but thinking about switching.",
        images: [],
        upvotes: 28,
        comments: 15,
        timeAgo: "5h ago",
    },
    // Add more...
];

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

export function Timeline() {
    return (
        <div className="space-y-8 mt-8">
            <OutingCard outing={mockOuting} />
            {mockPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}