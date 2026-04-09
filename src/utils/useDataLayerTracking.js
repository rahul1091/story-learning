import { useEffect, useRef, useCallback } from 'react';

export const useDataLayerTracking = (blok) => {
  const sectionRef = useRef(null);
  const hasTrackedView = useRef(false);

  // 1. View Tracking Logic (Intersection Observer)
  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'section_view',
            sectionId: blok.section_id || '',
            sectionName: blok.section_name || '',
            sectionInfo: blok.section_info || '',
            sectionType: blok.section_type || '',
          });
          hasTrackedView.current = true;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [blok]);

  // 2. Click Tracking Logic
  // Using useCallback to prevent unnecessary re-renders in child components
  const handleTrackClick = useCallback((customText = null, customUrl = null) => {
    const origin = window.location.origin;
    const rawUrl = customUrl || blok.button_link?.cached_url || blok.button_link?.url || '';
    
    // Construct the safe full URL
    const fullUrl = rawUrl.startsWith('http') 
      ? rawUrl 
      : `${origin}/${rawUrl.replace(/^\/+/, '')}`;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'section_click',
      sectionName: blok.section_name,
      sectionInfo: blok.section_info,
      sectionType: blok.section_type,
      clickText: customText || blok.button_text || 'no_text',
      clickUrl: fullUrl,
    });
  }, [blok]);

  return { sectionRef, handleTrackClick };
};