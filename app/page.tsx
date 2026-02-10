'use client';

import { useState } from 'react';
import { events } from './data/events';

export default function Home() {
  const [currentEvent, setCurrentEvent] = useState(0);
  
  // Calculate initial month based on current date
  const getInitialMonth = () => {
    const today = new Date();
    const month = today.getMonth();
    return (month >= 0 && month <= 4) ? month : 0;
  };
  
  const [currentMonth, setCurrentMonth] = useState(getInitialMonth);
  
  const months = [
    { name: 'January', days: 31, startDay: 3 }, // January 2026 starts on Thursday (3)
    { name: 'February', days: 28, startDay: 0 }, // February 2026 starts on Sunday (0)
    { name: 'March', days: 31, startDay: 0 }, // March 2026 starts on Sunday (0)
    { name: 'April', days: 30, startDay: 3 }, // April 2026 starts on Wednesday (3)
    { name: 'May', days: 31, startDay: 5 } // May 2026 starts on Friday (5)
  ];

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev + 1) % months.length);
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev - 1 + months.length) % months.length);
  };

  const renderCalendar = () => {
    const month = months[currentMonth];
    const days = [];
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const isCurrentMonth = currentMonth === todayMonth;
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < month.startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square"></div>
      );
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= month.days; day++) {
      const isToday = isCurrentMonth && day === todayDate;
      
      days.push(
        <div 
          key={day} 
          className={`
            aspect-square flex items-center justify-center rounded-lg
            ${isToday ? 'bg-purple-700 border-2 border-purple-500' : 'bg-gray-700'}
            hover:bg-gray-600 transition-all cursor-pointer
          `}
        >
          <span className="text-sm">{day}</span>
        </div>
      );
    }
    
    return days;
  };

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Important Event Carousel */}
        <section className="mb-16">
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 relative">
            <div className="text-center px-16">
              <div className="mb-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <img 
                  src={events[currentEvent].image} 
                  alt={events[currentEvent].title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="text-sm mb-2">{events[currentEvent].date} at {events[currentEvent].time}</div>
              <div className="inline-block bg-gray-700 px-3 py-1 rounded-full text-xs mb-4">{events[currentEvent].type}</div>
              <h3 className="text-3xl font-bold mb-4">{events[currentEvent].title}</h3>
              <p>{events[currentEvent].desc}</p>
              
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

        {/* Weekly Calendar Section */}
        <section className="mb-16">
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={prevMonth}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-all"
                aria-label="Previous month"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-2xl font-bold">{months[currentMonth].name} 2026</h3>
              <button
                onClick={nextMonth}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-all"
                aria-label="Next month"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {renderCalendar()}
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Game Development</h3>
              <p>
                Learn to create games from scratch using popular engines like Unity, Godot, and Unreal Engine.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p>
                Work with talented artists, programmers, and designers on exciting game projects.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Game Jams</h3>
              <p>
                Participate in our semester game jams and showcase your creativity under time constraints.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
