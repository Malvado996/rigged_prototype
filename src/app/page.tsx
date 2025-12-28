import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen p-12 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl font-bold text-center">Rigged</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="h-40 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-semibold">
            Primary (Dark Green)
          </div>
          <div className="h-40 rounded-xl bg-accent flex items-center justify-center text-accent-foreground text-2xl font-semibold">
            Accent (Sand Beige)
          </div>
          <div className="h-40 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground text-2xl font-semibold">
            Secondary
          </div>
          <div className="h-40 rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-2xl font-semibold">
            Muted
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Sample Timeline Post</CardTitle>
            <CardDescription>Posted from the trail • Moab, UT</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted border-2 border-dashed border-border rounded-xl w-full h-64" /> {/* Photo placeholder */}
            <p className="text-lg">Just pinned a new outing. Epic red rock lines ahead. Whos joining the convoy? 🛻🏜️</p>
            <div className="flex flex-wrap gap-4">
              <Button>Upvote</Button>
              <Button variant="secondary">Comment</Button>
              <Button variant="outline">Share</Button>
              <Button variant="ghost">RSVP to Outing</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}