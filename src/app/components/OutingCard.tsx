import { MapPin, Calendar, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Outing {
    id: number;
    title: string;
    date: string; // "2026-04-05" format
    location: string;
    rsvps: number;
    gallery: string[]; // array of image URLs
}

export function OutingCard({ outing }: { outing: Outing }) {
    const formattedDate = new Date(outing.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Card className="overflow-hidden border-border bg-card">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">{outing.title}</h3>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                <span>{outing.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-primary">{outing.rsvps}</div>
                        <div className="text-sm text-muted-foreground">Going</div>
                    </div>
                </div>

                {/* Gallery Preview */}
                {outing.gallery.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-6 -mx-6">
                        {outing.gallery.slice(0, 3).map((img, i) => (
                            <div key={i} className="aspect-square relative">
                                <img
                                    src={img}
                                    alt={`Gallery ${i + 1}`}
                                    className="object-cover w-full h-full rounded-none"
                                />
                                {i === 2 && outing.gallery.length > 3 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-none">
                                        <span className="text-2xl font-bold text-white">
                                            +{outing.gallery.length - 3}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Action */}
                <Button size="lg" className="w-full">
                    <Users className="h-5 w-5 mr-2" />
                    RSVP to Outing
                </Button>
            </div>
        </Card>
    );
}