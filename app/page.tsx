'use client';

import { useState, useMemo } from 'react';
import { events } from './data/events';
import { importantEvents } from './data/importantEvents';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

export default function Home() {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [showGrid, setShowGrid] = useState(false);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const filtered = events.filter(event => {
      const eventDate = new Date(event.endDate || event.date);
      eventDate.setHours(23, 59, 59, 999); // Set to end of day

      return eventDate >= now;
    });

    return filtered;
  }, []);

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % importantEvents.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + importantEvents.length) % importantEvents.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <main className="min-h-screen pb-8 bg-gray-900 text-white">
      {/* Leaderboard Image */}
      <div className="relative bg-gradient-to-b from-gray-700/50 via-gray-800/30 to-transparent">
        <img 
          src="/images/leaderboard.png" 
          alt="Leaderboard"
          className="w-full"
        />
      </div>

      {/* Scrolling Banner */}
      <a 
        href="https://itch.io/jam/osu-game-jam-spring-2026" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block mb-8 overflow-hidden bg-red-600 py-3 hover:bg-red-700 transition-colors cursor-pointer"
      >
        <div className="animate-scroll whitespace-nowrap">
          <span className="text-xl font-bold mx-8">REGISTER FOR THE SPRING 2026 GAME JAM TODAY</span>
          <span className="text-xl font-bold mx-8">REGISTER FOR THE SPRING 2026 GAME JAM TODAY</span>
          <span className="text-xl font-bold mx-8">REGISTER FOR THE SPRING 2026 GAME JAM TODAY</span>
          <span className="text-xl font-bold mx-8">REGISTER FOR THE SPRING 2026 GAME JAM TODAY</span>
          <span className="text-xl font-bold mx-8">REGISTER FOR THE SPRING 2026 GAME JAM TODAY</span>
          <span className="text-xl font-bold mx-8">REGISTER FOR THE SPRING 2026 GAME JAM TODAY</span>
          <span className="text-xl font-bold mx-8">REGISTER FOR THE SPRING 2026 GAME JAM TODAY</span>
          <span className="text-xl font-bold mx-8">REGISTER FOR THE SPRING 2026 GAME JAM TODAY</span>
          <span className="text-xl font-bold mx-8">REGISTER FOR THE SPRING 2026 GAME JAM TODAY</span>
          <span className="text-xl font-bold mx-8">REGISTER FOR THE SPRING 2026 GAME JAM TODAY</span>
        </div>
      </a>

      <div className="max-w-7xl mx-auto px-8">
        {/* Important Event Carousel */}
        <section className="mb-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 relative">
            <div className="text-center">
              {importantEvents[currentEvent].image !== "None" && (
                <div className="mb-6 rounded-lg overflow-hidden max-w-4xl mx-auto">
                  <img 
                    src={importantEvents[currentEvent].image} 
                    alt={importantEvents[currentEvent].title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
              <div className="text-sm mb-2">{importantEvents[currentEvent].date}</div>
              <h3 className="text-3xl font-bold mb-4">{importantEvents[currentEvent].title}</h3>
              <p>
                {importantEvents[currentEvent].description}
                {importantEvents[currentEvent].link && (
                  <>
                    {' '}
                    <a 
                      href={importantEvents[currentEvent].link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      {importantEvents[currentEvent].linkText}
                    </a>
                  </>
                )}
              </p>
              
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={prevEvent}
                  className="bg-gray-700 hover:bg-gray-600 p-1.5 rounded-full transition-all"
                  aria-label="Previous event"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex gap-2">
                  {importantEvents.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentEvent(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentEvent ? 'bg-gray-400 w-8' : 'bg-gray-600'
                      }`}
                      aria-label={`Go to event ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextEvent}
                  className="bg-gray-700 hover:bg-gray-600 p-1.5 rounded-full transition-all"
                  aria-label="Next event"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="mb-16">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-all"
              aria-label={showGrid ? 'Show Scroll View' : 'Show Grid View'}
            >
              {!showGrid ? (
                <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )}
            </button>
          </div>

          {!showGrid ? (
            <Swiper
              modules={[Navigation, FreeMode]}
              navigation
              freeMode
              spaceBetween={24}
              slidesPerView="auto"
              className="!px-1 !py-2"
              style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-navigation-size': '20px',
              } as React.CSSProperties}
            >
              {upcomingEvents.map((event, index) => (
                <SwiperSlide key={index} className="!w-80 !h-auto">
                  <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-gray-600 px-2 py-1 rounded text-xs font-bold">{event.type}</span>
                      <span className="text-sm text-gray-400">
                        {event.time}
                        {event.endTime && ` - ${event.endTime}`}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {formatDate(event.date)}
                      {event.endDate && ` - ${formatDate(event.endDate)}`}
                    </p>
                    {event.location && (
                      <p className="text-sm text-gray-400 mb-3">{event.location}</p>
                    )}
                    <p className="text-sm text-gray-300 flex-1">{event.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-600 px-2 py-1 rounded text-xs font-bold">{event.type}</span>
                    <span className="text-sm text-gray-400">
                      {event.time}
                      {event.endTime && ` - ${event.endTime}`}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {formatDate(event.date)}
                    {event.endDate && ` - ${formatDate(event.endDate)}`}
                  </p>
                  {event.location && (
                    <p className="text-sm text-gray-400 mb-3">{event.location}</p>
                  )}
                  <p className="text-sm text-gray-300 flex-1">{event.desc}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}