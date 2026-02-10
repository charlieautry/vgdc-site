export default function About() {
  return (
    <main className="min-h-screen pb-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About VGDC</h1>
        
        <section className="mb-16">
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-16">
            The Video Game Development Club at Oklahoma State University is dedicated to fostering a community of passionate game developers, artists, and enthusiasts. Join us to learn, create, and share your love for game development!
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Officers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Dillon Eckley</h3>
                <p className="text-gray-400 mb-1">President</p>
                <p className="text-gray-400 mb-1">Major</p>
                <p className="text-gray-400">Sophomore</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Christopher Knoles</h3>
                <p className="text-gray-400 mb-1">Vice-President</p>
                <p className="text-gray-400 mb-1">Major</p>
                <p className="text-gray-400">Senior</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Jase Scott</h3>
                <p className="text-gray-400 mb-1">Secretary</p>
                <p className="text-gray-400 mb-1">Major</p>
                <p className="text-gray-400">Junior</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Nathan Livesay</h3>
                <p className="text-gray-400 mb-1">Treasurer</p>
                <p className="text-gray-400 mb-1">Major</p>
                <p className="text-gray-400">Junior</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Joshua Price</h3>
                <p className="text-gray-400 mb-1">Outreach</p>
                <p className="text-gray-400 mb-1">Major</p>
                <p className="text-gray-400">Senior</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Charlie Autry</h3>
                <p className="text-gray-400 mb-1">Marketing</p>
                <p className="text-gray-400 mb-1">Major</p>
                <p className="text-gray-400">Junior</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
