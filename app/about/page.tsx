'use client';

import Image from 'next/image';
import { galleryImages } from '../data/gallery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

import officersJson from '@/content/officers.json';
import aboutJson from '@/content/about.json';

export default function About() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <main className="min-h-screen pb-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 pt-8">
        {/* Officers Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{aboutJson.officersHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officersJson.items.map((officer) => (
              <div key={officer.name} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-[32rem] overflow-hidden relative">
                  <Image
                    src={officer.image}
                    alt={officer.name}
                    fill
                    className={`object-cover ${officer.imageClass ?? ''}`.trim()}
                  />
                </div>
                <div className="p-6 bg-gray-800">
                  <h3 className="text-2xl font-bold mb-2">{officer.name}</h3>
                  <p className="text-gray-400 mb-2">{officer.role}</p>
                  <p className="text-gray-400 mb-2">{officer.major}</p>
                  <p className="text-gray-400">{officer.year}</p>
                </div>
              </div>
            ))}
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
                  <SwiperSlide key={index} className="relative">
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-contain bg-gray-800"
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
                    <div className="aspect-square rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity relative">
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover bg-gray-800"
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

        {/* About the Club Sections */}
        {aboutJson.sections.map((section) => (
          <section key={section.heading} className="mb-16">
            <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">{section.heading}</h2>
              <div className="space-y-4 text-gray-300">
                {section.body.split(/\n\s*\n/).map((paragraph, i) => (
                  <p key={i} className="text-xl indent-8">{paragraph}</p>
                ))}
                {section.image && (
                  <div className="rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.image} alt={section.heading} className="w-full h-auto" />
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
