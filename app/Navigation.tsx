'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800/90 text-white sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-4 h-16 items-center">
          <Link 
            href="/" 
            className={`hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/' ? 'bg-gray-700' : ''
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
          <Link 
            href="/about" 
            className={`hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/about' ? 'bg-gray-700' : ''
            }`}
          >
            <img src="/images/about.png" alt="About" className="h-4" />
          </Link>
          <Link 
            href="/resources" 
            className={`hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/resources' ? 'bg-gray-700' : ''
            }`}
          >
            <img src="/images/resources.png" alt="Resources" className="h-4" />
          </Link>
          <Link 
            href="/game-jam" 
            className={`hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/game-jam' ? 'bg-gray-700' : ''
            }`}
          >
            <img src="/images/gamejam.png" alt="Game Jam" className="h-8" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
