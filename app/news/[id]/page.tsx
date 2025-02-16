import { getNews } from '@/data/news';
import Link from 'next/link';
import Image from 'next/image';

export default async function NewsDetailPage({
    params
}: {
    params: Promise<{ id: string }> | { id: string }
}) {
    // Await the params object
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const newsItems = await getNews();
    // Find the specific news item based on the ID
    const newsItem = newsItems.find(item => item.id === id);

    if (!newsItem) {
        return <div>新闻未找到</div>;
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-16">
            {/* <Image src={newsItem.src} alt={newsItem.title} width={100} height={200} /> */}
            <Image
                src={newsItem.src}
                alt={newsItem.title}
                width={800}
                height={300}
                priority
                style={{
                    display: 'block',
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover'
                }}
            />
            <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
            <p className="text-gray-600 mb-4">{newsItem.date}</p>
            <p className="text-lg">{newsItem.content}</p>
            <Link href="/news" className="text-blue-500">返回新闻列表</Link>
        </div>
    );
}