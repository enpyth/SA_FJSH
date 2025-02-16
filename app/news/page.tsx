import { getNews } from '@/data/news'; // Import the getNews function
import Link from "next/link"

export default async function NewsPage() {
    const newsItems = await getNews();

    return (
      <div className="container mx-auto px-4 md:px-6 py-16">
        <h1 className="text-3xl font-bold mb-4 text-center">新闻列表</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.summary}</p>
              <Link href={`/news/${item.id}`} className="text-blue-500">阅读更多</Link>
            </div>
          ))}
        </div>
      </div>
    );
}

