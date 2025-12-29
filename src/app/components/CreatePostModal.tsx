"use client";

import { useState } from "react";
import { X, Camera, Users, MessageSquare, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { uploadPhoto } from "@/lib/supabase-storage";

type PostType = "community" | "forum" | "marketplace";

const typeConfig = {
    community: { label: "Community", icon: Users, color: "bg-accent text-accent-foreground" },
    forum: { label: "Forum", icon: MessageSquare, color: "bg-primary text-primary-foreground" },
    marketplace: { label: "Marketplace", icon: DollarSign, color: "bg-accent text-accent-foreground" },
};

export function CreatePostModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [text, setText] = useState("");
    const [selectedType, setSelectedType] = useState<PostType>("community");
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const handlePost = async () => {
        if (files.length === 0 && !text.trim()) {
            alert("Add text or photos");
            return;
        }

        setIsUploading(true);

        try {
            const urls = await Promise.all(files.map((file) => uploadPhoto(file)));

            console.log("Uploaded URLs:", urls);

            // Save to DB
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: text,
                    type: selectedType,
                    images: urls,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to save post");
            }

            const { post } = await res.json();
            console.log("Post saved to DB:", post);

            alert("Post saved! Refresh to see it in the feed 🔥");
            onClose();
            window.location.reload();
        } catch (e) {
            console.error(e);
            alert("Error: " + (e instanceof Error ? e.message : "Unknown"));
        } finally {
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto bg-card">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Create Post</h2>
                        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Type Selector */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {(Object.keys(typeConfig) as PostType[]).map((type) => {
                            const { label, icon: Icon } = typeConfig[type];
                            const isSelected = selectedType === type;
                            return (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${isSelected ? "border-primary bg-primary/10" : "border-border"
                                        }`}
                                >
                                    <Icon className="h-8 w-8" />
                                    <span className="text-sm font-medium">{label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Text Input */}
                    <Textarea
                        placeholder="What's on your mind from the trail?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-32 mb-6 resize-none"
                    />

                    {/* Photo Upload Grid */}
                    <div className="mb-6">
                        <Label>Photos (up to 10)</Label>
                        <div className="mt-2 grid grid-cols-4 gap-4">
                            {files.map((file, i) => (
                                <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className="object-cover w-full h-full"
                                    />
                                    <button
                                        onClick={() => setFiles(files.filter((_, index) => index !== i))}
                                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}

                            <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition">
                                <Camera className="h-8 w-8 text-muted-foreground" />
                                <span className="text-xs mt-2 text-muted-foreground">Add Photo</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setFiles([...files, ...Array.from(e.target.files)].slice(0, 10));
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Post Button */}
                    <Button
                        size="lg"
                        className="w-full"
                        disabled={isUploading || (files.length === 0 && !text.trim())}
                        onClick={handlePost}
                    >
                        {isUploading ? "Uploading..." : "Post"}
                    </Button>
                </div>
            </Card>
        </div>
    );
}