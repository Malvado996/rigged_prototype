export type PostType = "community" | "forum" | "marketplace";

export interface PostFromDB {
    id: number;
    user_id: string;
    type: PostType;
    content: string | null;
    images: string[];
    upvotes: number;
    created_at: string;
    is_pro: boolean;
}

export interface Post {
    id: number;
    userId: string;
    type: PostType;
    content: string;
    images: string[];
    upvotes: number;
    created_at: string;
    is_pro: boolean;  // ← Add this (optional for now)
    // Later: userName, avatar, badge
}