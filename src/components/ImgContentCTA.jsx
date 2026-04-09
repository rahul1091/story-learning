"use client";
import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';
import Link from 'next/link';
import { useDataLayerTracking } from '../utils/useDataLayerTracking';

const ImgContentCTA = ({ blok }) => {
  const { sectionRef, handleTrackClick } = useDataLayerTracking(blok);

  const sectionID = blok.section_id ?? '';
	const bgColor = blok.bg_color?.color || 'transparent';
	const textColor = blok.text_color?.color || 'inherit';
  const layoutClasses = {
    'media-left-content-right': 'xl:flex-row',
    'media-right-content-left': 'xl:flex-row-reverse',
  };

  const pageLayout = layoutClasses[blok.layout_option] || 'xl:flex-row';

  const buttonUrl = blok.button_link?.cached_url || blok.button_link?.url;
  const buttonTarget = blok.button_link?.target;
  const hasButton = blok.button_text && buttonUrl;

	return (
		<div 
      {...storyblokEditable(blok)} 
      ref={sectionRef}
      id={sectionID} 
      className="heading-description-main px-5 py-8 sm:px-10 sm:py-12" 
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className={`container mx-auto flex flex-col ${pageLayout} items-center gap-8`}>
        <div className='image-container w-full xl:w-1/2 p-2'>
          <img className='mx-auto max-h-[560px] rounded-lg' src={blok.image?.filename} alt={blok.alt_text} />
        </div>
        <div className='content-container w-full xl:w-1/2 p-2'>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{blok.heading}</h2>
          <div className="text-lg md:text-xl leading-[1.5]">
            <StoryblokServerRichText doc={blok.description} />
          </div>
          {hasButton && (
            <Link 
              href={buttonUrl} 
              className="text-xl text-center text-bold inline-block px-8 py-3 mt-4 min-w-[160px] rounded-lg capitalize transition-opacity hover:opacity-90"
              style={{ backgroundColor: textColor, color: bgColor }}
              onClick={() => handleTrackClick()}
              target={buttonTarget}
            >
              {blok.button_text}
            </Link>
          )}
        </div>
      </div>
		</div>
	);
};

export default ImgContentCTA;