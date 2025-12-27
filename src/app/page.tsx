import { Header } from './components/Header';
import { Timeline } from './components/Timeline';
import { NewPostButton } from './components/NewPostButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <NewPostButton />
        <Timeline />
      </div>
    </main>
  );
}