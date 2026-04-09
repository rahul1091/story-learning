'use client';

import { useState, useEffect } from 'react';
import { storyblokEditable } from "@storyblok/react/rsc";

const VideoContent = ({ blok }) => {
  const bgColor = blok.bg_color?.color || 'transparent';
	const textColor = blok.text_color?.color || 'inherit';
  const layoutClasses = {
    'media-left-content-right': 'xl:flex-row',
    'media-right-content-left': 'xl:flex-row-reverse',
  };
  const pageLayout = layoutClasses[blok.layout_option] || 'xl:flex-row';

  const [isOpen, setIsOpen] = useState(false);

  // --- Scroll Lock Logic ---
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'unset';
    }

    // Cleanup function: ensures scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]); 
  // --------------------------

  return (
    <section {...storyblokEditable(blok)} className="px-5 py-8 sm:px-10 sm:py-12" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className={`container mx-auto flex flex-col ${pageLayout} items-center gap-8`}>
        <div className="w-full xl:w-1/2 p-2 relative group cursor-pointer" onClick={() => setIsOpen(true)}>
          <img src={blok.video_thumbnail?.filename} alt={blok.heading} className="rounded-xl shadow-lg w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-black border-b-[10px] border-b-transparent" />
            </div>
          </div>
        </div>
        <div className="content-container w-full xl:w-1/2 p-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{blok.heading}</h2>
          <p className="text-lg md:text-xl leading-[1.5] mb-16 last:mb-0">{blok.description}</p>
        </div>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)} // Close when clicking the backdrop
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl" 
            onClick={(e) => e.stopPropagation()} // Prevent click-through closing
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300 transition-colors"
            >
              &times;
            </button>
            <iframe
              src={blok.video_url.filename}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoContent;