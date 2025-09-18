import { AppBar } from '@/components/AppBar';
import { RecordingInterface } from '@/components/RecordingInterface';
import { RecentRecordings } from '@/components/RecentRecordings';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <AppBar />

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">
            Never miss a meeting detail
          </h1>
          <p className="text-base text-slate-600 leading-6">
            Record, transcribe, and get action items automatically
          </p>
        </div>

        {/* Recording Interface */}
        <RecordingInterface />

        {/* Recent Recordings */}
        <RecentRecordings />
      </div>
    </main>
  );
}
