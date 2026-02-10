'use client';

import { useState } from 'react';

export default function Home() {
  const [currentEvent, setCurrentEvent] = useState(0);
  
  const events = [
    {
      date: "Month DD, YYYY",
      title: "Event Title 1",
      description: "Event description goes here..."
    },
    {
      date: "Month DD, YYYY",
      title: "Event Title 2",
      description: "Event description goes here..."
    },
    {
      date: "Month DD, YYYY",
      title: "Event Title 3",
      description: "Event description goes here..."
    }
  ];

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Important Event Carousel */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-lg border border-purple-500/30 relative">
            <button
              onClick={prevEvent}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-600/50 hover:bg-purple-600/80 p-2 rounded-full transition-all"
              aria-label="Previous event"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="text-center px-16">
              <div className="text-sm text-purple-300 mb-2">{events[currentEvent].date}</div>
              <h3 className="text-3xl font-bold mb-4">{events[currentEvent].title}</h3>
              <p className="text-gray-300">{events[currentEvent].description}</p>
              
              <div className="flex justify-center gap-2 mt-6">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEvent(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentEvent ? 'bg-purple-400 w-8' : 'bg-gray-500'
                    }`}
                    aria-label={`Go to event ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextEvent}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-600/50 hover:bg-purple-600/80 p-2 rounded-full transition-all"
              aria-label="Next event"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Hero Section */}
        <section className="mb-16 text-center py-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Video Game Development Club
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Oklahoma State University
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Join us in creating amazing games, learning new skills, and connecting with fellow game developers!
          </p>
        </section>

        {/* About Section */}
        <section className="mb-16 bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">About VGDC</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              The Video Game Development Club is a community of passionate students who love creating and playing games. 
              Whether you're a programmer, artist, designer, musician, or just interested in game development, 
              there's a place for you here!
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-900/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-pink-400">📍 Meeting Location</h3>
                <p className="text-gray-300">[Meeting Room Info Here]</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-pink-400">⏰ Meeting Time</h3>
                <p className="text-gray-300">[Meeting Time Here]</p>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Calendar Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">Weekly Meetings</h2>
          <div className="bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-purple-300 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {/* Calendar days - this is a placeholder, you can make it dynamic later */}
              {Array.from({ length: 35 }, (_, i) => (
                <div 
                  key={i} 
                  className={`
                    aspect-square flex items-center justify-center rounded-lg
                    ${i % 7 === 3 ? 'bg-purple-600/30 border-2 border-purple-400' : 'bg-gray-700/30'}
                    hover:bg-gray-600/50 transition-all cursor-pointer
                  `}
                >
                  <span className="text-sm">{i + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-gray-400">
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 bg-purple-600/30 border-2 border-purple-400 rounded"></span>
                Meeting Day
              </span>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">What We're Passionate About</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-2">Game Development</h3>
              <p className="text-gray-300">
                Learn to create games from scratch using popular engines like Unity, Godot, and Unreal Engine.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-gray-300">
                Work with talented artists, programmers, and designers on exciting game projects.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Game Jams</h3>
              <p className="text-gray-300">
                Participate in our semester game jams and showcase your creativity under time constraints.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
