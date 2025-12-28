import { currentUser } from "@clerk/nextjs/server";

export default async function TimelinePage() {
    const user = await currentUser();

    if (!user) {
        return null; // Redirect handled by middleware
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8">Welcome to the Timeline, {user.firstName || user.username}</h2>
            <p className="text-lg text-muted-foreground">Your feed will appear here once we build it 🚧🛻</p>
        </div>
    );
}