"use client";
import { storyblokEditable } from '@storyblok/react/rsc';
import { hexToRgba } from '../utils/colors';
import { useDataLayerTracking } from '../utils/useDataLayerTracking';

const Hero = ({ blok }) => {
  const { sectionRef } = useDataLayerTracking(blok);

  const sectionID = blok.section_id ?? '';
  const bgColor = blok.bg_color?.color || 'transparent';
  const bgImage = blok.bg_image?.filename;
  const textColor = blok.text_color?.color || 'inherit';

  // Set default opacity if not defined in Storyblok
  const opacity = blok.overlay_opacity || 0.8;
  // Convert hex + opacity to RGBA
  const transparentOverlay = hexToRgba(blok.bg_overlay?.color, opacity);

  return (
    <div {...storyblokEditable(blok)} 
      ref={sectionRef}
      className="hero-main relative overflow-hidden min-h-[30rem] flex items-center" 
      id={sectionID}
      style={{ 
        backgroundColor: bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background Overlay */}
      {bgImage && (
        <div 
          className="absolute inset-0 z-0" 
          style={{ backgroundColor: transparentOverlay }} 
        />
      )}

      {/* Content Container */}
      <div className='container mx-auto px-5 py-8 w-full relative z-10 sm:px-8 sm:py-10 md:py-12'>
        <h1 className="text-center text-4xl font-bold md:text-5xl xl:text-6xl" style={{ color: textColor }}>{blok.headline}</h1>
        <p className="text-center text-lg mt-5 text-sky-900 md:text-xl leading-[1.5]" style={{ color: textColor }}>{blok.content}</p>
      </div>
    </div>
  );
};

export default Hero;
