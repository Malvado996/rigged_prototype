import { PostCard } from './PostCard';
import { OutingCard } from './OutingCard';

// Define the shape of a post
type Post = {
    id: number;
    author: string;
    avatar: string;
    content: string;
    photos: string[];
    votes: number;
    isPro: boolean;
};

// Mock data now typed
const mockPosts: Post[] = [
    {
        id: 1,
        author: 'TrailBoss',
        avatar: '/placeholder.svg',
        content: 'First night on the Idaho BDR — sunset was unreal',
        photos: ['/placeholder.svg'],
        votes: 42,
        isPro: true,
    },
    {
        id: 2,
        author: 'MudKing',
        avatar: '/placeholder.svg',
        content: 'Winch out on Black Bear Pass — thanks for the spot @TrailBoss',
        photos: [],
        votes: 28,
        isPro: false,
    },
];

const mockOuting = {
    id: 1,
    title: 'Moab Easter Run',
    date: '2026-04-05',
    location: 'Moab, UT',
    rsvps: 18,
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
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