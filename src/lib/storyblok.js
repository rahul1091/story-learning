import Page from "../components/Page";
import Header from '../components/global/Header';
import Footer from "../components/global/Footer";
import Feature from "../components/Feature";
import Grid from "../components/Grid";
import Teaser from "../components/Teaser";
import Tour from "../components/Tour";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";
import RecommendedTours from "../components/RecommendedTours";
import Slider from "../components/Slider";
import ContactForm from "../components/ContactForm";
import Sitemap from "../components/global/Sitemap";
import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";
import VideoBanner from "../components/VideoBanner";
import HeadingDescription from "../components/HeadingDescription";
import ImgContentCTA from "../components/ImgContentCTA";
import VideoContent from "../components/VideoContent";
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

const cachedFetch = (input, init) => {
  return fetch(input, {
    ...init,
    // Note: Storyblok uses "cv" (cache version) in the URL. This logic ensures development stays fresh while production is fast.
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    // Optional: add Next.js specific revalidation tags
    next: { tags: ['storyblok'] } 
  });
};

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	components: {
		page: Page,
		header: Header,
		footer: Footer,
		feature: Feature,
		grid: Grid,
		teaser: Teaser,
		tour: Tour,
		hero: Hero,
		testimonial: Testimonial,
		recommended_tours: RecommendedTours,
		slider: Slider,
    contact_form: ContactForm,
		sitemap: Sitemap,
		faq: FrequentlyAskedQuestion,
		video_banner: VideoBanner,
		heading_description: HeadingDescription,
		img_content_cta: ImgContentCTA,
		video_content: VideoContent,
	},
	apiOptions: {
    fetch: cachedFetch,
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: process.env.STORYBLOK_REGION || 'eu',
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});
