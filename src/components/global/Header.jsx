"use client";

import { useState } from 'react';
import { storyblokEditable } from "@storyblok/react";
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

export default function Header({ blok }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  
  const currentLang = params.lang || 'en';

  const headerBlok = blok?.block?.find(
    (item) => item.component === "header"
  );

  if (!headerBlok) return null;

  // Helper to fix Storyblok slugs and handle localization
  const formatLink = (linkObj) => {
    let slug = linkObj.url?.cached_url || linkObj.url || "";

    // 1. If it's the home page, set to empty string
    if (slug === "home") slug = "";

    // 2. Remove default language prefix if it exists in the cached_url
    if (slug.startsWith("en/")) slug = slug.replace("en/", "");

    // 3. Ensure internal links have a leading slash, external links don't
    const isInternal = !slug.startsWith("http");
    const baseUrl = isInternal ? (currentLang === "en" ? "/" : `/${currentLang}/`) : "";
    
    // Combine base and slug, then clean up double slashes
    return `${baseUrl}${slug}`.replace(/\/+/g, "/");
  };

  const getTranslatablePath = (targetLang) => {
    if (!pathname) return "/";
    const segments = pathname.split('/').filter(Boolean);
    
    // Remove current language segment if present
    if (segments[0] === 'de' || segments[0] === 'en') {
      segments.shift();
    }
    
    const path = `/${segments.join('/')}`;
    return targetLang === 'en' ? path : `/de${path}`.replace(/\/+/g, "/");
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <header 
        {...storyblokEditable(headerBlok)} 
        className='main-navigation bg-slate-800 py-4 px-6 sticky top-0 z-50 shadow-md border-b-2 border-orange-400/75'
      >
        <div className='header-wrapper max-w-[1520px] mx-auto grid grid-cols-3 items-center relative z-50'>
          <div className="flex justify-start">
            <button 
              className="text-sky-50 focus:outline-none cursor-pointer hover:text-orange-400 transition-all duration-300" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <svg className="w-10 h-10 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  // The "X" Close Icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // The Left-Aligned Reverse Stagger
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h13" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 18h10" />
                  </>
                )}
              </svg>
            </button>
          </div>

          <div className="flex justify-center">
            <Link href={currentLang === 'en' ? '/' : '/de'} onClick={() => setIsOpen(false)}>
              {headerBlok.logo?.filename && (
                <img 
                  src={headerBlok.logo.filename} 
                  alt={headerBlok.logo.alt || 'logo'} 
                  className='site-logo h-10 md:h-14 w-auto object-contain' 
                />
              )}
            </Link>
          </div>

          <div className="flex justify-end items-center gap-2 text-xs md:text-sm font-bold">
            <Link 
              href={getTranslatablePath('en')}
              className={`px-3 py-1 rounded-full transition-all ${currentLang === 'en' ? 'bg-orange-500 text-white' : 'text-sky-50 hover:bg-slate-700'}`}
            >
              EN
            </Link>
            <span className="text-slate-500">|</span>
            <Link 
              href={getTranslatablePath('de')}
              className={`px-3 py-1 rounded-full transition-all ${currentLang === 'de' ? 'bg-orange-500 text-white' : 'text-sky-50 hover:bg-slate-700'}`}
            >
              DE
            </Link>
          </div>
        </div>

        <nav className={`
          absolute top-full left-0 w-full 
          bg-slate-900 shadow-xl border-b border-orange-400/20
          transition-all duration-300 ease-in-out origin-top z-40
          ${isOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}
        `}>
          <div className="max-w-[1520px] mx-auto px-8 py-8 flex flex-col items-center space-y-8">
            {headerBlok.links?.map((link) => (
              <Link 
                key={link._uid} 
                href={formatLink(link)} 
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-sky-50 hover:text-orange-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}