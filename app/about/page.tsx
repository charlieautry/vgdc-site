'use client';

import { galleryImages } from '../data/gallery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

export default function About() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <main className="min-h-screen pb-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 pt-8">
        {/* Officers Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">25-26 Officer Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-96 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Dillon Eckley</h3>
                <p className="text-gray-400 mb-2">President</p>
                <p className="text-gray-400 mb-2">Applied Computer Programming</p>
                <p className="text-gray-400">Sophomore</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-96 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Christopher Knoles</h3>
                <p className="text-gray-400 mb-2">Vice-President</p>
                <p className="text-gray-400 mb-2">Business</p>
                <p className="text-gray-400">Senior</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-96 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Jase Scott</h3>
                <p className="text-gray-400 mb-2">Secretary</p>
                <p className="text-gray-400 mb-2">Computer Science</p>
                <p className="text-gray-400">Year in School</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-96 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Nathan Livesay</h3>
                <p className="text-gray-400 mb-2">Treasurer</p>
                <p className="text-gray-400 mb-2">Computer Science</p>
                <p className="text-gray-400">Junior</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-96 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Joshua Price</h3>
                <p className="text-gray-400 mb-2">Outreach</p>
                <p className="text-gray-400 mb-2">Computer Science</p>
                <p className="text-gray-400">Year in School</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-96 bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Charles Autry</h3>
                <p className="text-gray-400 mb-2">Marketing</p>
                <p className="text-gray-400 mb-2">Computer Science</p>
                <p className="text-gray-400">Junior</p>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="mb-16">
          {galleryImages.length > 0 ? (
            <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
              {/* Main Image Swiper */}
              <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="w-full aspect-square rounded-lg overflow-hidden"
                style={{
                  '--swiper-navigation-color': '#fff',
                  '--swiper-navigation-size': '24px',
                } as React.CSSProperties}
              >
                {galleryImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover bg-gray-800"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnails Swiper */}
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs, FreeMode, Navigation]}
                navigation
                freeMode
                watchSlidesProgress
                slidesPerView={5}
                spaceBetween={8}
                className="w-full"
                style={{
                  '--swiper-navigation-color': '#fff',
                  '--swiper-navigation-size': '20px',
                } as React.CSSProperties}
              >
                {galleryImages.map((image, index) => (
                  <SwiperSlide key={index} className="!h-auto">
                    <div className="aspect-square rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover bg-gray-800"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <p className="text-gray-400">No gallery images found. Add images to public/images/gallery/</p>
          )}
        </section>

        {/* About the Club Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">About Our Club</h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                The Video Game Development Club was founded in 2023 and officially sponsored in 2026. 
                We are a passionate community of game developers, designers, and enthusiasts dedicated to 
                creating amazing gaming experiences.
              </p>
              <p className="text-lg">
                Our mission is to foster creativity and collaboration among students interested in game development. 
                We're currently working towards hosting Oklahoma's best game jam, providing hands-on workshops, 
                and growing our community of creators.
              </p>
              <p className="text-lg">
                Whether you're a seasoned developer or just starting out, we're here to help you learn, 
                create, and bring your game ideas to life. Join us as we build the future of gaming together!
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
