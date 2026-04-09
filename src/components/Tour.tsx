"use client";
import { useState, useEffect } from 'react';
import { storyblokEditable, StoryblokServerRichText } from '@storyblok/react/rsc';
import { getStoryblokApi } from "../lib/storyblok";
import { useRouter, useParams } from 'next/navigation'; // Added useParams
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Tour = (props: any) => {
  const { blok } = props;
  const params = useParams();
  const router = useRouter();
  
  // Detect language from URL (e.g., /de/tours/mumbai -> lang: 'de')
  const lang = (params.lang as string) || "default";

  // Static translations dictionary
  const i18n = {
    en: {
      selectTour: "Select a Tour Option:",
      exploreOther: "Explore Other Tours:",
      choose: "Choose a tour...",
      price: "Price",
      person: "per person",
      duration: "Duration",
      book: "Book Tour"
    },
    de: {
      selectTour: "Wählen Sie eine Touroption:",
      exploreOther: "Andere Touren erkunden:",
      choose: "Wählen Sie eine Tour...",
      price: "Preis",
      person: "pro Person",
      duration: "Dauer",
      book: "Tour buchen"
    }
  };

  const t = i18n[lang as keyof typeof i18n] || i18n.en;

  const tour_options = blok.tour_options || [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTour = tour_options[selectedIndex];
  const [allTours, setAllTours] = useState<any[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      const client = getStoryblokApi();
      const response = await client.getStories({
        content_type: "tour",
        version: process.env.NODE_ENV === "development" ? "draft" : "published",
        language: lang, // CRITICAL: Fetch other tours in the current language
      });
      setAllTours(response.data.stories);
    };

    fetchTours();
  }, [lang]); // Re-fetch if language changes

  const handleBookTour = () => {
    if (!selectedTour) return;

    const queryParams = new URLSearchParams({
      city: blok.name,
      name: selectedTour.tour_name,
      price: selectedTour.tour_price.toString().replace(/[^0-9.]/g, ''),
    });

    // Ensure booking route preserves language prefix
    const bookingPath = lang === "default" || lang === "en" ? "/booking" : `/${lang}/booking`;
    router.push(`${bookingPath}?${queryParams.toString()}`);
  };

  return (
    <main {...storyblokEditable(blok)} className="tour-page-main container mx-auto p-5 sm:p-6 md:p-8 w-full">
      <h1 className='text-rose-900 text-center text-4xl font-bold mt-4 mb-8 md:text-5xl xl:text-6xl'>
        {blok.name}
      </h1>
      <p className='tour-introduction mb-8'>
        {blok.introduction}
      </p>
      
      {/* Slider Section */}
      <div className="slider-wrapper container py-16 w-full mx-auto px-4">
        <Swiper
          loop={true} 
          modules={[Autoplay, Navigation]}
          centeredSlides={true}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 2000, disableOnInteraction: false, }}
          breakpoints={{
            1024: { slidesPerView: 2, spaceBetween: 30 },
            1536: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="custom-swiper-slider"
        >
          {blok.img_slider?.map((slide: any) => (
            <SwiperSlide key={slide._uid}>
              <img 
                className="rounded-lg border-1 border-gray-600"
                src={slide.image.filename} 
                alt={slide.image.alt || "Slider Image"} 
                style={{ width: '100%', height: 'auto' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='tour-description mb-8'>
        <StoryblokServerRichText doc={blok.body} />
      </div>

      <hr className="mb-10 border-gray-500" />

      {/* Internal Tour Options Selector */}
      <div className='tour-selector mx-auto flex flex-col justify-between mb-8'>
        <div className='w-full lg:max-w-2/5 mb-8'>
          <label htmlFor="tour-select" className="block mb-2 font-bold text-lg text-gray-700">{t.selectTour}</label>
          <select 
            id="tour-select"
            className="w-full p-4 border-2 border-rose-900 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
          >
            {tour_options.map((option: any, index: number) => (
              <option key={option._uid || index} value={index}>
                {option.tour_name}
              </option>
            ))}
          </select>
        </div>

        {selectedTour && (
          <div className="w-full p-6 bg-rose-50 border-l-4 border-rose-900 rounded-r-lg animate-in fade-in duration-500">
            <h3 className="font-bold text-2xl text-rose-900 mb-4">
              {selectedTour.tour_name}
            </h3>
            <div className="tour-details text-gray-800 mb-4">
              <StoryblokServerRichText doc={selectedTour.tour_details} />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start border-t border-rose-200 py-4">
              <span className="font-semibold text-lg text-rose-700 mb-4 sm:mb-0">
                {t.price}: {selectedTour.tour_price} {t.person}
              </span>
              <span className="text-base font-medium text-gray-700 italic">
                {t.duration}: {selectedTour.tour_duration}
              </span>
            </div>
            <button 
              onClick={handleBookTour}
              className='mt-4 bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-900 transition-colors'
            >
              {t.book}
            </button>
          </div>
        )}
      </div>

      <hr className="mb-10 border-gray-500" />

      {/* Localized External Tour List Selector */}
      <div className='tour-list mx-auto mb-8 flex flex-col justify-between'>
        <div className='w-full lg:max-w-2/5 mb-8'>
          <label htmlFor="tour-list" className="block mb-2 font-bold text-lg text-gray-700">{t.exploreOther}</label>
          <select 
            id="tour-list"
            className="w-full p-4 border-2 border-rose-900 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            onChange={(e) => {
                if(e.target.value) {
                  // Storyblok full_slug usually includes the lang prefix for non-default languages
                  window.location.href = `/${e.target.value}`;
                }
            }}
          >
            <option value="">{t.choose}</option>
            {allTours.map((tour) => (
              <option key={tour.uuid} value={tour.full_slug}>
                {tour.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </main>
  );
}

export default Tour;