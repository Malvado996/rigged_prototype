"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Header() {
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
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "h-10 w-10",
                                },
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}