'use client';

export default function PastJams() {
  return (
    <main className="min-h-screen pb-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <div className="flex items-center gap-4 mb-8">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
          </svg>
          <h1 className="text-4xl font-bold">Past Game Jams</h1>
        </div>
        
        <div className="space-y-8">
          {/* Fall 2025 Game Jam */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all">
            <h2 className="text-2xl font-bold mb-2">Fall 2025 Game Jam</h2>
            <p className="text-gray-400 mb-4">4 submissions</p>
            
            {/* 1st Place Winner Image */}
            <div className="mb-6 rounded-lg overflow-hidden relative">
              <img 
                src="/images/fall2025-1stplace.png" 
                alt="Fall 2025 Game Jam 1st Place Winner"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <p className="text-white font-semibold drop-shadow-lg">VGDC ORBITAL DEMO by WafflesTheHutt</p>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://itch.io/jam/osu-vgdc-gamejam-2025/results"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                View Results on itch.io
              </a>
              <a 
                href="https://wafflesthehutt.itch.io/vgdc-orbital-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                View 1st Place
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
