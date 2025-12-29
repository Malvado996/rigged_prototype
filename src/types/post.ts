export type PostType = "community" | "forum" | "marketplace";

export interface PostFromDB {
    id: number;
    user_id: string;
    type: PostType;
    content: string | null;
    images: string[];
    upvotes: number;
    created_at: string;
}

export interface Post {
    id: number;
    userId: string;
    type: PostType;
    content: string;
    images: string[];
    upvotes: number;
    created_at: string;
    // Computed fields (we'll add userName/avatar/badge later)
}