"use client";
import { storyblokEditable } from '@storyblok/react/rsc';

const Feature = ({ blok }) => {
	const cardColor = blok.card_color?.color || 'transparent';
	const textColor = blok.text_color?.color || 'inherit';

	return (
		<div {...storyblokEditable(blok)} className="feature-main p-8 rounded-sm shadow" style={{ backgroundColor: cardColor }}>
			<h3 className="font-bold text-3xl" style={{ color: textColor }}>{blok.headline}</h3>
			<p className="mt-6 text-lg leading-[1.5]" style={{ color: textColor }}>{blok.content}</p>
		</div>
	);
};

export default Feature;
