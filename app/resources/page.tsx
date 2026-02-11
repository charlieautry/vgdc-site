'use client';

import { useState, useMemo } from 'react';
import { resources, Resource } from '../data/resources';

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(resources.map(r => r.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const renderResourceCard = (resource: Resource, index: number) => {
    return (
      <div key={index} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-gray-700 px-2 py-1 rounded text-xs">{resource.category}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
        <p className="text-sm text-gray-300 mb-4">{resource.description}</p>

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
            Visit Resource
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
          <div className="relative">
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
        </div>

        {/* Results Count */}
        <p className="text-gray-400 mb-4">
          {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
        </p>

        {/* Resources Grid */}
        <div className="flex flex-col gap-6">
          {filteredResources.map((resource, index) => renderResourceCard(resource, index))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No resources found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}
