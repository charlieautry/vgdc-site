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
              <div className="h-[32rem] bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Dillon Eckley</h3>
                <p className="text-gray-400 mb-2">President</p>
                <p className="text-gray-400 mb-2">Applied Computer Programming</p>
                <p className="text-gray-400">Sophomore</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src="/images/christopherknoles.jpg" 
                alt="Christopher Knoles"
                className="h-[32rem] w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Christopher Knoles</h3>
                <p className="text-gray-400 mb-2">Vice-President</p>
                <p className="text-gray-400 mb-2">Business Management</p>
                <p className="text-gray-400">Senior</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-[32rem] bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Jase Scott</h3>
                <p className="text-gray-400 mb-2">Secretary</p>
                <p className="text-gray-400 mb-2">Computer Science</p>
                <p className="text-gray-400">Year in School</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-[32rem] bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Nathan Livesay</h3>
                <p className="text-gray-400 mb-2">Treasurer</p>
                <p className="text-gray-400 mb-2">Computer Science</p>
                <p className="text-gray-400">Junior</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src="/images/joshuaprice.jpg" 
                alt="Joshua Price"
                className="h-[32rem] w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Joshua Price</h3>
                <p className="text-gray-400 mb-2">Outreach</p>
                <p className="text-gray-400 mb-2">Computer Science</p>
                <p className="text-gray-400">Year in School</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src="/images/charlesautry.jpeg" 
                alt="Charles Autry"
                className="h-[32rem] w-full object-cover object-[center_20%]"
              />
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
            <div className="flex flex-col items-center gap-6 max-w-7xl mx-auto">
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
          <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">What is VGDC?</h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-xl indent-8">
                    The Video Game Development Club was founded in 2015 and officially re-sponsored in 2026. 
                We are a passionate community of game developers, designers, and enthusiasts inspired by everything videogames. For over a decade, we've been dedicated to fostering creativity, learning, and collaboration among our members.
              </p>
            <p className="text-xl indent-8">
                    Our mission as a club is to get more people involved in game development, and we provide a large network of support and resources to help our members learn and grow. From resources and workshops 
                to game jams and projects, there are a wide range of opportunities for members to develop their skills and connect with others who share their passion for creation.
              </p>
              <p className="text-xl indent-8">
                    Your experience level doesn't matter - whether you're a complete beginner or an experienced developer, we welcome you to join us and be a part of our community. We believe that everyone has something valuable to contribute, and we strive to create an inclusive and supportive environment where all members can thrive.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
