"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Header() {
    const { isLoaded, isSignedIn, user } = useUser();  // <-- Client-side hook, safe in "use client"

    return (
        <header className="fixed top-0 left-0 right-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
                    Rigged
                </Link>

                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="default" size="sm">
                                Sign In
                            </Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        {isLoaded && isSignedIn && (
                            <div className="flex items-center gap-3">
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "h-10 w-10 ring-2 ring-primary/50 ring-offset-2 ring-offset-background",
                                        },
                                    }}
                                />
                                <div className="hidden sm:block text-right">
                                    <p className="text-sm font-medium text-foreground">
                                        {user.username ? `@${user.username}` : user.firstName || "Overlander"}
                                    </p>
                                    <p className="text-xs text-accent-foreground">
                                        Moab Veteran {/* Fake earned badge preview */}
                                    </p>
                                </div>
                            </div>
                        )}
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}