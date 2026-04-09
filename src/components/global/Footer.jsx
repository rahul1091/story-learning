"use client";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Footer({ blok }) {
  const params = useParams();
  const currentLang = params.lang || "en";

  const footerBlok = blok.block?.find(
    (item) => item.component === "footer"
  );

  if (!footerBlok) return null;

  /**
   * Helper to format Storyblok links for Next.js localization
   */
  const formatUrl = (linkObj) => {
    let slug = linkObj.cached_url || linkObj.url || "";

    // 1. Handle the home page slug
    if (slug === "home") slug = "";

    // 2. Remove default language prefix if it exists in the cached_url string
    if (slug.startsWith("en/")) slug = slug.replace("en/", "");

    // 3. Construct the final localized path
    // If it's an external link (starts with http), return as is
    if (slug.startsWith("http")) return slug;

    // Build path: /lang/slug or just /slug for English
    const localizedPath = currentLang === "en" 
      ? `/${slug}` 
      : `/${currentLang}/${slug}`;

    // Clean up any double slashes (e.g., //about -> /about)
    return localizedPath.replace(/\/+/g, "/");
  };

  return (
    <footer 
      {...storyblokEditable(footerBlok)} 
      className="bg-zinc-800 text-white px-8 lg:px-16 py-8"
    >
      <div className="max-w-[1520px] mx-auto grid lg:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          {footerBlok.logo?.filename && (
            <img 
              src={footerBlok.logo.filename} 
              alt={footerBlok.logo.alt || "Logo"} 
              className="h-12 w-auto mb-4" 
            />
          )}
          <p className="text-slate-300">
            {footerBlok.description}
          </p>
        </div>

        {/* Localized Navigation Links */}
        <div className="flex flex-col gap-4 lg:items-end lg:justify-end">
          {footerBlok.nav_links?.map((link) => (
            <Link 
              key={link._uid} 
              href={formatUrl(link.url)} 
              className="text-amber-400 hover:text-orange-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Links (Usually external, so no localization needed) */}
        <div className="flex gap-4 items-center lg:justify-end">
          {footerBlok.social_links?.map((social) => (
            <Link 
              key={social._uid} 
              href={social.url?.cached_url || social.url || "#"} 
              target="_blank" 
              rel="noreferrer"
            >
              {social.icon?.filename && (
                <img 
                  src={social.icon.filename} 
                  alt={social.icon.alt || "Social Icon"}
                  className="w-8 h-8 hover:opacity-80 transition-opacity" 
                />
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1520px] mx-auto border-t border-orange-500 pt-4 mt-8 text-center text-sm text-white">
        {footerBlok.copyright}
      </div>
    </footer>
  );
}