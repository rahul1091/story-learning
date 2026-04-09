"use client";

import { Slide } from "./Slide";
import { storyblokEditable } from "@storyblok/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Slider = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)} className="img-slider-main bg-olive-50">
      <div className="slider-wrapper container py-6 sm:py-8 lg:py-12 xl:py-16 w-full mx-auto px-4">
        <Swiper
          loop={true} 
          centeredSlides={true}
          modules={[Navigation]}
          navigation
          spaceBetween={-20}
          slidesPerView={1}
          breakpoints={{
            1024: {
              slidesPerView: 2,
            },
            1536: {
              slidesPerView: 3,
            },
          }}
          className="custom-swiper-slider"
        >
          {blok.slides.map((slide) => (
            <SwiperSlide key={slide._uid}>
              {({ isActive }) => (
                <div 
                  className={`transition-transform duration-500 ease-in-out ${
                    isActive ? "scale-95 lg:scale-110 z-10 opacity-100" : "scale-85 lg:opacity-60"
                  }`}
                >
                  <img 
                    src={slide.image.filename} 
                    alt={slide.image.alt || "Slider Image"} 
                    className="w-full max-h-auto rounded-lg shadow-lg"
                  />
                  <p className={`slide-title mt-4 text-center transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}>
                    {slide.title}
                  </p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;