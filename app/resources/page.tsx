'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { resources, Resource } from '../data/resources';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [displayedResources, setDisplayedResources] = useState<Resource[]>([]);
  const resourceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Shuffle function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const categories = useMemo(() => {
    const cats = new Set(resources.map(r => r.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    resources.forEach(resource => {
      resource.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const filteredTags = useMemo(() => {
    return allTags.filter(tag => 
      tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
    );
  }, [allTags, tagSearchQuery]);

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(selectedTag => resource.tags.includes(selectedTag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchQuery, selectedCategory, selectedTags]);

  // Shuffle resources whenever filtered results change
  useEffect(() => {
    setDisplayedResources(shuffleArray(filteredResources));
  }, [filteredResources]);

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * displayedResources.length);
    setHighlightedIndex(randomIndex);
    
    setTimeout(() => {
      resourceRefs.current[randomIndex]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
    
    setTimeout(() => {
      setHighlightedIndex(null);
    }, 3000);
  };

  const renderResourceCard = (resource: Resource, index: number) => {
    const isHighlighted = highlightedIndex === index;
    return (
      <div 
        key={index} 
        ref={(el) => { resourceRefs.current[index] = el; }}
        className={`bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all p-6 ${
          isHighlighted ? 'ring-4 ring-blue-500' : ''
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-gray-700 px-2 py-1 rounded text-xs">{resource.category}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
        <p className="text-sm text-gray-300 mb-4">{resource.description}</p>

        {resource.image && (
          <div className="mb-4">
            <img 
              src={resource.image} 
              alt={resource.title}
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}

        {resource.type === 'youtube' && (
          <div className="mb-4 aspect-video">
            <iframe
              className="w-full h-full rounded"
              src={`https://www.youtube.com/embed/${resource.url}`}
              title={resource.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {resource.type === 'link' && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        {resource.type === 'download' && (
          <a
            href={resource.url}
            download
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-all"
          >
            Download File
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {resource.tags.map((tag, i) => (
            <span key={i} className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen pb-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex gap-4 flex-col sm:flex-row">
            {/* Search Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search resources... try filtering by tags like godot or tutorial!"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-gray-600"
              />
              <svg 
                className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Tag Filter Dropdown */}
            <Listbox value={selectedTags} onChange={setSelectedTags} multiple>
              <div className="relative sm:w-64">
                <Listbox.Button className="relative w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-left focus:outline-none focus:border-gray-600 cursor-pointer">
                  <span className="block truncate">
                    {selectedTags.length === 0 
                      ? 'Filter by tags...' 
                      : `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected`
                    }
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full sm:w-96 sm:right-0 overflow-auto rounded-lg bg-gray-800 border border-gray-700 py-2 text-base shadow-lg focus:outline-none">
                    {/* Search input for tags */}
                    <div className="px-2 pb-2 mb-2 border-b border-gray-700">
                      <input
                        type="text"
                        placeholder="Search tags..."
                        value={tagSearchQuery}
                        onChange={(e) => setTagSearchQuery(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-1 px-2">
                      {filteredTags.map((tag) => (
                        <Listbox.Option
                          key={tag}
                          value={tag}
                          className={({ active }) =>
                            `cursor-pointer select-none py-2 px-2 rounded ${
                              active ? 'bg-gray-700' : ''
                            }`
                          }
                        >
                          {({ selected }) => (
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                                selected ? 'bg-blue-500 border-blue-500' : 'border-gray-600'
                              }`}>
                                {selected && (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <span className={`text-xs truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                #{tag}
                              </span>
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                      {filteredTags.length === 0 && (
                        <div className="col-span-3 text-center text-gray-400 text-sm py-4">
                          No tags found
                        </div>
                      )}
                    </div>
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            {/* Surprise Me Button */}
            <button
              onClick={handleSurpriseMe}
              disabled={displayedResources.length === 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap"
            >
              Surprise me!
            </button>
          </div>

          {/* Selected Tags Display */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 transition-colors"
                >
                  #{tag}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ))}
              <button
                onClick={() => setSelectedTags([])}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full text-sm transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-gray-400 mb-4">
          {displayedResources.length} {displayedResources.length === 1 ? 'resource' : 'resources'} found
        </p>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedResources.map((resource, index) => renderResourceCard(resource, index))}
        </div>

        {displayedResources.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No resources found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}
