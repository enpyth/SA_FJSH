import HomeClient from '@/components/HomeClient'
import { getNews } from '@/data/news'
import { getSponsors, getCarouselImages } from '@/data/home'

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  // Fetch data on the server side
  const eventsResponse = await fetch(`${baseUrl}/api/events?type=upcoming`, { 
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const availableEvents = await eventsResponse.json();
  
  const images = await getCarouselImages();
  const sponsors = await getSponsors();
  const newsItems = await getNews();

  return (
    <HomeClient 
      initialEvents={availableEvents}
      carouselImages={images}
      sponsors={sponsors}
      newsItems={newsItems}
    />
  )
}

