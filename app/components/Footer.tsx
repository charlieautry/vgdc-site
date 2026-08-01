'use client';

import { useState } from 'react';
import faqJson from '@/content/faq.json';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = faqJson.items;

export default function Footer() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Half - Logo and Social Media */}
          <div className="flex flex-col items-center md:items-end md:pr-6 md:border-r md:border-gray-700 pb-12 md:pb-0">
            <div className="mb-6">
              <img 
                src="/images/logo.png" 
                alt="VGDC Logo" 
                className="h-32 md:ml-auto"
              />
            </div>
            
            {/* Social Media Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a 
                href="https://campuslink.okstate.edu/organization/videogamedevelopment" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors flex items-center justify-center"
                aria-label="Campus Link"
              >
                <img 
                  src="/images/campuslink.png" 
                  alt="Campus Link" 
                  className="w-6 h-6 brightness-0 invert"
                />
              </a>

              
              <a 
                href="https://discord.gg/xcHV49H7T3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors flex items-center justify-center"
                aria-label="Discord"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              
              <a 
                href="https://groupme.com/join_group/107389383/2Rpa9DEp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors flex items-center justify-center"
                aria-label="GroupMe"
              >
                <img 
                  src="/images/groupme.png" 
                  alt="GroupMe" 
                  className="w-6 h-6 brightness-0 invert"
                />
              </a>
              
              <a 
                href="https://linktr.ee/OSU_VGDC" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors flex items-center justify-center"
                aria-label="Linktree"
              >
                <img 
                  src="/images/linktree.svg" 
                  alt="Linktree" 
                  className="w-6 h-6 brightness-0 invert"
                />
              </a>
            </div>
          </div>

          {/* Right Half - FAQs */}
          <div className="md:pl-6 pt-12 md:pt-0">
            <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-600 transition-colors"
                  >
                    <span className="font-semibold text-white">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>{new Date().getFullYear()} OSU Video Game Development Club</p>
        </div>
      </div>
    </footer>
  );
}
