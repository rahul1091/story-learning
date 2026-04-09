"use client";
import { RecommendedTour } from "./RecommendedTour";
import { storyblokEditable } from '@storyblok/react/rsc';

const RecommendedTours = (params) => {
  return (
    <div {...storyblokEditable(params.blok)} className="recommended-tours-main py-16 container mx-auto w-full px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        {params.blok.headline}
      </h2>
      <div className="grid md:grid-cols-2 gap-8 mt-16">
        {params.blok.tours.map((tour) => (
          <RecommendedTour story={tour} key={tour.content._uid} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTours;