"use client";

import { useState } from "react";
import { X, Camera, Image as ImageIcon, Truck, Users, MessageSquare, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUploadThing } from "@/lib/uploadthing";

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

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            console.log("Files uploaded!", res);
            alert("Upload complete!");
            onClose();
        },
        onUploadError: (e) => {
            alert("Upload failed: " + e.message);
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Create Post</h2>
                        <button onClick={onClose}><X className="h-6 w-6" /></button>
                    </div>

                    {/* Type Selector */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {(Object.keys(typeConfig) as PostType[]).map((type) => {
                            const config = typeConfig[type];
                            const Icon = config.icon;
                            const isSelected = selectedType === type;
                            return (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`p-4 rounded-xl border-2 transition-all ${isSelected ? "border-primary scale-105" : "border-border"
                                        }`}
                                >
                                    <Icon className="h-8 w-8 mx-auto mb-2" />
                                    <span className="text-sm font-medium">{config.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Text */}
                    <Textarea
                        placeholder="What's on your mind from the trail?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-32 mb-6"
                    />

                    {/* Photo Upload */}
                    <div className="mb-6">
                        <Label>Photos (up to 10)</Label>
                        <div className="mt-2 grid grid-cols-4 gap-4">
                            {files.map((file, i) => (
                                <div key={i} className="relative aspect-square">
                                    <img src={URL.createObjectURL(file)} alt="" className="rounded-lg object-cover w-full h-full" />
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
                                            setFiles([...files, ...Array.from(e.target.files)]);
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
                        disabled={isUploading || (!text.trim() && files.length === 0)}
                        onClick={() => {
                            if (files.length > 0) {
                                startUpload(files);
                            } else {
                                alert("Posted! (stub)");
                                onClose();
                            }
                        }}
                    >
                        {isUploading ? "Uploading..." : "Post"}
                    </Button>
                </div>
            </Card>
        </div>
    );
}