"use client";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { useParams } from "next/navigation"; // Added for language detection
import { hexToRgba } from "../../utils/colors";

export default function Sitemap({ blok }) {
  const params = useParams();
  const currentLang = params.lang || "en"; // Default to English if no lang param

  const bgColor = blok.bg_color?.color || "transparent";
  const textColor = blok.text_color?.color || "inherit";
  const bgImage = blok.bg_image?.filename;

  const opacity = blok.overlay_opacity || 0.8;
  const transparentOverlay = hexToRgba(blok.bg_overlay?.color, opacity);

  /**
   * Helper to format Storyblok links for multi-lingual Next.js routing
   */
  const formatUrl = (linkObj) => {
    let slug = linkObj.cached_url || linkObj.url || "";

    // 1. Handle the home page case
    if (slug === "home") slug = "";

    // 2. Remove default language prefix if it exists in the cached_url string
    if (slug.startsWith("en/")) slug = slug.replace("en/", "");

    // 3. Return as is if it's an external link
    if (slug.startsWith("http")) return slug;

    // 4. Construct path: /slug for English, /de/slug for German
    const localizedPath = currentLang === "en" 
      ? `/${slug}` 
      : `/${currentLang}/${slug}`;

    // 5. Remove any double slashes (e.g., //about -> /about)
    return localizedPath.replace(/\/+/g, "/");
  };

  return (
    <div
      {...storyblokEditable(blok)}
      className="relative overflow-hidden w-full pt-16 pb-16 min-h-[40rem]"
      style={{
        backgroundColor: bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      {bgImage && (
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: transparentOverlay }}
        />
      )}

      {/* Content Container */}
      <div className="container mx-auto px-8 relative z-10">
        <h1
          className="text-center text-4xl font-bold md:text-5xl xl:text-6xl"
          style={{ color: textColor }}
        >
          {blok.heading}
        </h1>
        
        <div className="flex flex-col items-center gap-4 mt-12">
          {blok.sitemap_links?.map((link) => (
            <Link
              key={link._uid}
              href={formatUrl(link.url)} // Use the helper here
              className="text-lg md:text-xl hover:font-bold transition-all"
              style={{ color: textColor }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}