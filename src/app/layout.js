import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';
import { getStoryblokApi } from '../lib/storyblok';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import Breadcrumbs from '../components/global/Breadcrumb';

export const metadata = {
	title: 'Story Learning',
	description: 'Learn how to use Storyblok with our comprehensive guides and tutorials.',
};

async function getHeaderData() {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get('cdn/stories/globals/header', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story;
  } catch (error) {
    console.error('Error fetching header data:', error);
    return null;
  }
}

async function getFooterData() {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get('cdn/stories/globals/footer', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return null;
  }
}

export default function RootLayout({ children }) {
  const headerData = getHeaderData();
  const footerData = getFooterData();

  return (
    <html lang='en' className=''>
      <body className='bg-sky-50 mx-auto max-w-[1920px]'>
        <StoryblokProvider>
          {headerData && <Header blok={headerData} />}
          <Breadcrumbs />
          {children}
          {footerData && <Footer blok={footerData} />}
        </StoryblokProvider>
      </body>
    </html>
  );
}
