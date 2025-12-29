export type PostType = "community" | "forum" | "marketplace";

export interface Post {
    id: number;
    type: PostType;
    userName: string;
    userAvatar: string;
    badge?: string;  // e.g., "Convoy Leader"
    content: string;
    images: string[];  // array of URLs
    upvotes: number;
    comments: number;
    timeAgo: string;
    created_at: string;
}