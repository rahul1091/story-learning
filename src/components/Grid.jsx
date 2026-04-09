"use client";
import { StoryblokComponent } from '@storyblok/react/rsc';
import { storyblokEditable, StoryblokServerComponent } from '@storyblok/react/rsc';

const Grid = ({ blok }) => {
	const bgColor = blok.bg_color?.color || 'transparent';
	const headlineColor = blok.headline_color?.color || 'inherit';

	return (
		<div {...storyblokEditable(blok)} className="grid-main py-16" style={{ backgroundColor: bgColor }}>
			<div className='container mx-auto w-full px-4'>
				<h2 className='text-3xl md:text-4xl font-bold' style={{ color: headlineColor }}>{blok.headline}</h2>
				<div className='grid lg:grid-flow-col auto-cols-fe mt-12 gap-8'>
					{blok.items.map((nestedBlok) => (
						<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Grid;
