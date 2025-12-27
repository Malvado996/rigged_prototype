import { Mountain } from 'lucide-react';

export function Header() {
    return (
        <header className="bg-camelGreen border-b border-camelSand/20">
            <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Mountain className="w-10 h-10 text-camelSand" />
                    <h1 className="text-3xl font-bold text-camelSand">Rigged</h1>
                </div>
                <p className="text-camelSand/80">Overland Community</p>
            </div>
        </header>
    );
}