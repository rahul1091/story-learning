import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '../../lib/storyblok';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let fullSlug = slug ? slug.join('/') : 'home';
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return {
      title: data.story.content.meta_title + ' | Story Learning' || 'Story Learning',
      description: data.story.content.meta_description || 'Learn how to use Storyblok with our comprehensive guides and tutorials.',
    };
  } catch (error) {
    console.error('Error fetching story for metadata:', error);
    return {
      title: 'Story Learning',
      description: 'Learn how to use Storyblok with our comprehensive guides and tutorials.',
    };
  }
}

export default async function Page({ params }) {
	const { slug } = await params;
	let fullSlug = slug ? slug.join('/') : 'home';
	let sbParams = {
		version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
	};

	const storyblokApi = getStoryblokApi();
	let { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);

	return <StoryblokStory story={data.story} />;
}
