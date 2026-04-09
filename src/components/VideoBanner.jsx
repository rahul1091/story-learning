import { storyblokEditable } from "@storyblok/react";
import { hexToRgba } from '../utils/colors';

const VideoBanner = ({ blok }) => {
  const opacity = blok.overlay_opacity || 0.8;
  const baseColor = blok.bg_overlay?.color;
  const transparentOverlay = hexToRgba(baseColor, opacity);

  return (
    <div {...storyblokEditable(blok)} className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src={blok.video.filename} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Background Overlay */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: transparentOverlay }}/>

      <div className="container mx-auto relative z-10 text-center text-white px-6">
        <h2 className="mb-6 text-3xl font-bold md:text-4xl xl:text-5xl">{blok.heading}</h2>
        <p className="text-xl leading-[1.5]">{blok.sub_heading}</p>
      </div>
    </div>
  );
};

export default VideoBanner;