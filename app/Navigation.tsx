'use client';

import Link from 'next/link';
import { usePathname } from "next/navigation";
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import settings from '@/content/settings.json';

export default function Navigation() {
  const pathname = usePathname();
  const [isHovering, setIsHovering] = useState(false);
  const [isPastJamsHover, setIsPastJamsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleButtonClick = (e: React.MouseEvent) => {
    if (isMobile) {
      if (!isHovering) {
        e.preventDefault();
      }
      setIsHovering(!isHovering);
    }
  };

  const handleGameJamLinkClick = (e: React.MouseEvent) => {
    if (isMobile && !isHovering) {
      e.preventDefault();
    }
  };

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-2 sm:space-x-4 h-16 items-center">
          <Link 
            href="/" 
            className="mr-2 sm:mr-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/logo.png" 
              alt="VGDC Logo" 
              className="h-10 sm:h-12"
            />
          </Link>
          
          <Link 
            href="/" 
            className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-110 ${
              pathname === '/' ? 'bg-gray-700' : ''
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
          <Link 
            href="/about" 
            className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-110 ${
              pathname === '/about' ? 'bg-gray-700' : ''
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/about.png" alt="About" className="h-3 sm:h-4" />
          </Link>
          <Link 
            href="/resources" 
            className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-110 ${
              pathname === '/resources' ? 'bg-gray-700' : ''
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/resources.png" alt="Resources" className="h-3 sm:h-4" />
          </Link>
          
          {/* Headless UI Menu Dropdown */}
          <div
            onMouseEnter={() => !isMobile && setIsHovering(true)}
            onMouseLeave={() => !isMobile && setIsHovering(false)}
            className="relative"
          >
            <Menu>
              {() => (
                <>
                  <Menu.Button 
                    className="px-2 sm:px-3 py-0 rounded-t-md text-sm font-medium flex items-center h-16 transition-all hover:scale-110"
                    onClick={handleButtonClick}
                  >
                    <a
                      href={settings.gameJamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGameJamLinkClick(e);
                      }}
                      className="transition-transform"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/gamejam.png" alt="Game Jam" className="h-6 sm:h-8" />
                    </a>
                  </Menu.Button>
                  
                  <Transition
                    show={isHovering}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                  >
                    <Menu.Items 
                      static
                      className="absolute left-0 top-full bg-gray-800 backdrop-blur-sm shadow-2xl focus:outline-none overflow-hidden rounded-b-md"
                      style={{
                        width: 'calc(100% + 1rem)',
                        marginLeft: '-0.5rem',
                        marginTop: '0'
                      }}
                    >
                      <Menu.Item>
                        {() => (
                          <Link
                            href="/past-jams"
                            className="flex items-center justify-center w-full px-2 sm:px-3 py-2 transition-colors"
                            onClick={() => setIsHovering(false)}
                            onMouseEnter={() => setIsPastJamsHover(true)}
                            onMouseLeave={() => setIsPastJamsHover(false)}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src="/images/pastjams.png" 
                              alt="Past Jams" 
                              className={`h-6 sm:h-8 transition-transform ${
                                isPastJamsHover ? 'scale-110' : ''
                              }`}
                            />
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
