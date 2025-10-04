import React from 'react';

export const SkeletonCard = ({ isDarkMode }) => (
  <div className={`rounded-xl shadow-sm border p-6 animate-pulse ${
    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
  }`}>
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
      <div className={`h-4 w-24 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
    </div>
    <div className={`h-10 w-32 rounded mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
    <div className={`h-16 w-full rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
    <div className={`h-4 w-20 rounded mt-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
  </div>
);

export const SkeletonTable = ({ isDarkMode, rows = 5 }) => (
  <div className={`rounded-xl shadow-sm border p-6 ${
    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
  }`}>
    <div className={`h-6 w-48 rounded mb-6 animate-pulse ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
          <div className={`h-12 flex-1 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-12 w-24 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-12 w-24 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-12 w-20 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonChart = ({ isDarkMode }) => (
  <div className={`rounded-xl shadow-sm border p-8 ${
    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
  }`}>
    <div className={`h-6 w-48 rounded mb-6 animate-pulse ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
    <div className={`h-80 w-full rounded animate-pulse ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
  </div>
);

export const PageTransition = ({ children }) => (
  <div className="animate-fadeIn">
    {children}
  </div>
);

export const FadeIn = ({ children, delay = 0 }) => (
  <div 
    className="animate-fadeIn"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export const SlideIn = ({ children, direction = 'up', delay = 0 }) => {
  const animations = {
    up: 'animate-slideInUp',
    down: 'animate-slideInDown',
    left: 'animate-slideInLeft',
    right: 'animate-slideInRight'
  };

  return (
    <div 
      className={animations[direction]}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const ScaleIn = ({ children, delay = 0 }) => (
  <div 
    className="animate-scaleIn"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);