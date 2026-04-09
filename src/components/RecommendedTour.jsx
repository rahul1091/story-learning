"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export const RecommendedTour = (props) => {
  const params = useParams();
  const lang = params.lang || "en";

  // 1. Define translations for static strings
  const translations = {
    en: {
      startsFrom: "Starts From",
      viewTour: "View Tour",
      india: "India",
      locale: "en-US"
    },
    de: {
      startsFrom: "Beginnt Bei",
      viewTour: "Tour ansehen",
      india: "Indien",
      locale: "de-DE"
    }
  };

  const t = translations[lang] || translations.en;

  // 2. Extract the story content for readability
  const content = props.story.content;

  // 3. Fix the Link: Ensure the slug includes the language prefix for German
  const tourHref = lang === "en" 
    ? `/${props.story.full_slug}` 
    : `/${lang}/${props.story.full_slug.replace(`${lang}/`, "")}`;

  return (
    <div className="bg-sky-950 rounded-lg shadow border-2 border-sky-950">
      <img 
        className="aspect-video rounded-lg object-cover w-full" 
        src={content.main_image?.filename} 
        alt={content.main_image?.alt || props.story.name} 
      />
      
      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-2 justify-between text-lg font-bold">
          <h3 className="text-white">{props.story.name}</h3>
          
          <p className="text-white font-normal text-sm md:text-base">
            {/* Translated Static Text */}
            {t.startsFrom}:{' '}
            {Number(content.price).toLocaleString(t.locale, {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
            })}
          </p>
        </div>

        <p className="text-white uppercase font-bold mt-2 text-sm tracking-wide">
          {content.location}, {t.india}
        </p>

        {/* Translated Link Text & Localized Href */}
        <Link 
          className="bg-green-100 px-4 py-2 text-sky-950 max-w-fit rounded-lg font-bold text-base mt-8 block hover:bg-green-400 transition-colors" 
          href={tourHref}
        >
          {t.viewTour}
        </Link>
      </div>
    </div>
  );
};