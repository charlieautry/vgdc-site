'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

interface GameSubmission {
  title: string;
  author: string;
  image: string;
  link: string;
  place?: number;
}

const spring2026Games: GameSubmission[] = [
  {
    title: "Wandor",
    author: "drThunderbuckle",
    image: "/images/s26gamejam/wandor.png",
    link: "https://drthunderbuckle.itch.io/wandor",
    place: 1
  },
  {
    title: "ByDayByKnight",
    author: "BlastDevelopment",
    image: "/images/s26gamejam/bydaybyknight.png",
    link: "https://blastdevelopment.itch.io/bydaybyknight",
    place: 2
  },
  {
    title: "Cold Brew",
    author: "Snakatack, Helloimbo",
    image: "/images/s26gamejam/coldbrew.png",
    link: "https://snakatack.itch.io/cold-brew",
    place: 3
  },
  {
    title: "Milo",
    author: "Shadow05Striker",
    image: "/images/s26gamejam/milo.png",
    link: "https://shadow05striker.itch.io/milo"
  },
  {
    title: "Reboot",
    author: "WafflesTheHutt",
    image: "/images/s26gamejam/reboot.png",
    link: "https://wafflesthehutt.itch.io/reboot"
  },
  {
    title: "DuoDash",
    author: "JoshuaPrice13",
    image: "/images/s26gamejam/duodash.png",
    link: "https://joshuaprice13.itch.io/duodash"
  },
  {
    title: "Above Myself",
    author: "leporus",
    image: "/images/s26gamejam/abovemyself.png",
    link: "https://leporus.itch.io/above-myself"
  },
  {
    title: "My Ghost and Me",
    author: "Daarkswoord",
    image: "https://i0.wp.com/seds.org/wp-content/uploads/2020/02/placeholder.png?fit=1200%2C800&ssl=1",
    link: "https://daarkswoord.itch.io/double-life"
  }
];

const fall2025Games: GameSubmission[] = [
  {
    title: "VGDC ORBITAL DEMO",
    author: "WafflesTheHutt",
    image: "/images/f25gamejam/orbitaldemo.png",
    link: "https://wafflesthehutt.itch.io/vgdc-orbital-demo",
    place: 1
  },
  {
    title: "No Return",
    author: "Snakatack, Helloimbo",
    image: "/images/f25gamejam/noreturn.png",
    link: "https://snakatack.itch.io/no-return"
  },
  {
    title: "Soundtrack",
    author: "Leporus",
    image: "/images/f25gamejam/soundtrack.png",
    link: "https://leporus.itch.io/soundtrack"
  },
  {
    title: "Shadow Switch Runner",
    author: "Daarkswoord, Myanglioce, JoshuaPrice13",
    image: "/images/f25gamejam/shadowrunner.png",
    link: "https://daarkswoord.itch.io/shadow-switch-runner"
  }
];

export default function PastJams() {
  return (
    <main className="min-h-screen pb-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <div className="flex items-center gap-4 mb-2">
          <svg className="w-10 h-10 animate-spin-reverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
          </svg>
          <h1 className="text-4xl font-bold">VGDC Rewind</h1>
        </div>
        <p className="text-gray-400 text-sm ml-14 mb-8">Here you can find our past game jam submissions and results from our members.</p>
        
        <div className="space-y-12">
          {/* Spring 2026 Game Jam */}
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Spring 2026 Game Jam</h2>
              <p className="text-gray-400">{spring2026Games.length} submissions</p>
            </div>

            {spring2026Games.length > 0 ? (
              <>
                {/* Game Cards Swiper */}
                <Swiper
                  modules={[Navigation, FreeMode, Pagination]}
                  navigation
                  freeMode
                  pagination={{ clickable: true }}
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 }
                  }}
                  className="!pb-12 !px-6 !py-4 !-mx-6 !-my-4"
                  style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-navigation-size': '20px',
                    '--swiper-pagination-color': '#FFD700',
                  } as React.CSSProperties}
                >
                  {spring2026Games.map((game, index) => (
                    <SwiperSlide key={index} className="!h-auto">
                      <a 
                        href={game.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block group cursor-pointer ${
                          game.place && game.place <= 3 ? 'ring-4 ' + (
                            game.place === 1 ? 'ring-yellow-500' :
                            game.place === 2 ? 'ring-gray-400' :
                            'ring-amber-700'
                          ) : ''
                        } rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl relative`}
                      >
                        {game.place && game.place <= 3 && (
                          <div className={`absolute top-2 right-2 z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                            game.place === 1 ? 'bg-yellow-500' :
                            game.place === 2 ? 'bg-gray-400' :
                            'bg-amber-700'
                          }`}>
                            {game.place}
                          </div>
                        )}
                        <div className="aspect-square bg-gray-700 overflow-hidden relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={game.image}
                            alt={game.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className={`p-4 ${
                          game.place === 1 ? 'bg-gradient-to-br from-yellow-600/20 to-gray-700' :
                          game.place === 2 ? 'bg-gradient-to-br from-gray-500/20 to-gray-700' :
                          game.place === 3 ? 'bg-gradient-to-br from-amber-700/20 to-gray-700' :
                          'bg-gray-700'
                        }`}>
                          <h3 className="font-bold text-lg mb-1 truncate">{game.title}</h3>
                          <p className="text-sm text-gray-400">by {game.author}</p>
                        </div>
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* View All Button */}
                <div className="flex justify-center mt-8">
                  <a 
                    href="https://itch.io/jam/osu-game-jam-spring-2026/results"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all hover:scale-105"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/images/itchiocolor.svg" 
                      alt="View results on itch.io" 
                      className="h-12"
                    />
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p>Game jam results will be posted here after the event!</p>
              </div>
            )}
          </div>

          {/* Fall 2025 Game Jam */}
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Fall 2025 Game Jam</h2>
              <p className="text-gray-400">{fall2025Games.length} submissions</p>
            </div>

            {/* Game Cards Swiper */}
            <Swiper
              modules={[Navigation, FreeMode, Pagination]}
              navigation
              freeMode
              pagination={{ clickable: true }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
              }}
              className="!pb-12 !px-6 !py-4 !-mx-6 !-my-4"
              style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-navigation-size': '20px',
                '--swiper-pagination-color': '#FFD700',
              } as React.CSSProperties}
            >
              {fall2025Games.map((game, index) => (
                <SwiperSlide key={index} className="!h-auto">
                  <a 
                    href={game.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block group cursor-pointer ${
                      game.place && game.place <= 3 ? 'ring-4 ' + (
                        game.place === 1 ? 'ring-yellow-500' :
                        'ring-amber-700'
                      ) : ''
                    } rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl relative`}
                  >
                    {/* Place Badge - Top 3 places */}
                    {game.place && game.place <= 3 && (
                      <div className={`absolute top-2 right-2 z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                        game.place === 1 ? 'bg-yellow-500' :
                        'bg-amber-700'
                      }`}>
                        {game.place}
                      </div>
                    )}

                    {/* Game Image */}
                    <div className="aspect-square bg-gray-700 overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Game Info */}
                    <div className={`p-4 ${
                      game.place === 1 ? 'bg-gradient-to-br from-yellow-600/20 to-gray-700' :
                      game.place === 3 ? 'bg-gradient-to-br from-amber-700/20 to-gray-700' :
                      'bg-gray-700'
                    }`}>
                      <h3 className="font-bold text-lg mb-1 truncate">{game.title}</h3>
                      <p className="text-sm text-gray-400">by {game.author}</p>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* View All Button */}
            <div className="flex justify-center mt-8">
              <a 
                href="https://itch.io/jam/osu-vgdc-gamejam-2025/results"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-105"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/itchiocolor.svg" 
                  alt="View results on itch.io" 
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
