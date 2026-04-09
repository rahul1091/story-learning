"use client";
import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';

const HeadingDescription = ({ blok }) => {
	const bgColor = blok.bg_color?.color || 'transparent';
	const textColor = blok.text_color?.color || 'inherit';

	return (
		<div {...storyblokEditable(blok)} className="heading-description-main px-5 py-10 sm:px-10 sm:py-12" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className='container mx-auto'>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{blok.heading}</h2>
        <div className="text-lg md:text-xl leading-[1.5]">
          <StoryblokServerRichText doc={blok.description} />
        </div>
      </div>
		</div>
	);
};

export default HeadingDescription;
