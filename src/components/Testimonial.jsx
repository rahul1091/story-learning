"use client";
import { storyblokEditable } from '@storyblok/react/rsc';

const Testimonial = ({ blok }) => {
	const cardColor = blok.card_color?.color || 'transparent';
	const textColor = blok.text_color?.color || 'inherit';

	return (
		<div {...storyblokEditable(blok)} className="testimonial-main p-8 rounded-sm shadow" style={{ backgroundColor: cardColor }}>
			<p className="text-xl" style={{ color: textColor }}>{blok.comment}</p>
			<p className="text-lg font-semibold mt-6 leading-[1.5]" style={{ color: textColor }}>{blok.name}</p>
		</div>
	);
};

export default Testimonial;
