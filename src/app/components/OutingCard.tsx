type Outing = {
    id: number;
    title: string;
    date: string;
    location: string;
    rsvps: number;
    gallery: string[];
};

export function OutingCard({ outing }: { outing: Outing }) {
    return (
        <article className="bg-camelGreen/20 border-2 border-camelGreen rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-2">{outing.title}</h3>
            <p className="text-camelSand mb-4">
                {outing.date} · {outing.location}
            </p>
            <p className="mb-4">
                <strong>{outing.rsvps}</strong> Going
            </p>
            <div className="grid grid-cols-3 gap-4">
                {outing.gallery.map((photo, i) => (
                    <div key={i} className="bg-gray-700 rounded-lg aspect-square" />
                ))}
            </div>
            <button className="mt-6 bg-camelSand text-camelDark px-8 py-3 rounded-lg font-bold hover:bg-camelCream">
                RSVP Going
            </button>
        </article>
    );
}