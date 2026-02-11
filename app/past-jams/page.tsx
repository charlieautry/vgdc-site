'use client';

export default function PastJams() {
  return (
    <main className="min-h-screen pb-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <h1 className="text-4xl font-bold mb-8">Past Game Jams</h1>
        
        <div className="space-y-8">
          {/* Add past jam entries here */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Spring 2026 Game Jam</h2>
            <p className="text-gray-400 mb-4">Coming soon...</p>
          </div>
        </div>
      </div>
    </main>
  );
}
