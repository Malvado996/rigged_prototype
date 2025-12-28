"use client";

import { SignedIn } from "@clerk/nextjs";
import {
    Home,
    Users,
    MessageSquare,
    DollarSign,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Timeline", href: "/timeline", icon: Home },
    { name: "Community", href: "/community", icon: Users },
    { name: "Forum", href: "/forum", icon: MessageSquare },
    { name: "Marketplace", href: "/marketplace", icon: DollarSign },
    { name: "Profile", href: "/profile", icon: User },
];

export function NavBar() {
    const pathname = usePathname();

    return (
        <SignedIn>
            <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
                <div className="grid grid-cols-5 h-16">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex flex-col items-center justify-center gap-1"
                            >
                                <item.icon
                                    className={`h-6 w-6 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"
                                        }`}
                                />
                                <span
                                    className={`text-xs transition-colors ${isActive ? "text-primary" : "text-muted-foreground"
                                        }`}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </SignedIn>
    );
}