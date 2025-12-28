"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, DollarSign, Heart } from "lucide-react";

type PostType = "community" | "forum" | "marketplace";

interface Post {
    id: string;
    type: PostType;
    author: string;
    avatar: string;
    username: string;
    badge?: string;
    title: string;
    content: string;
    image?: string;  // ← string or undefined, not boolean
    price?: number;
    upvotes: number;
    comments: number;
    timeAgo: string;
}

export function PostCard({ post }: { post: Post }) {
    const getTypeConfig = (type: PostType) => {
        switch (type) {
            case "community":
                return {
                    icon: Users,
                    color: "text-accent-foreground",
                    bg: "bg-accent/20",
                    badge: "border-l-4 border-accent",
                };
            case "forum":
                return {
                    icon: MessageSquare,
                    color: "text-primary",
                    bg: "bg-primary/10",
                    badge: "border-l-4 border-primary",
                };
            case "marketplace":
                return {
                    icon: DollarSign,
                    color: "text-accent-foreground",
                    bg: "bg-accent/20",
                    badge: "border-l-4 border-accent",
                };
        }
    };

    const config = getTypeConfig(post.type);
    const Icon = config.icon;

    return (
        <Card className={`overflow-hidden ${config.badge}`}>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-foreground">{post.author}</p>
                                {post.badge && (
                                    <Badge variant="secondary" className="text-xs">
                                        {post.badge}
                                    </Badge>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">@{post.username} • {post.timeAgo}</p>
                        </div>
                    </div>
                    <Icon className={`h-5 w-5 ${config.color}`} />
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription className="mt-2">{post.content}</CardDescription>
                </div>

                {post.image && (
                    <div className="bg-muted border-2 border-dashed rounded-xl w-full h-64" />
                )}

                {post.type === "marketplace" && post.price && (
                    <div className="flex justify-end">
                        <Badge variant="default" className="text-lg px-4 py-2 bg-accent text-accent-foreground">
                            ${post.price}
                        </Badge>
                    </div>
                )}

                <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <Heart className="h-4 w-4" />
                            {post.upvotes}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}