import { insertManyEvents } from '@/src/queries/insert';
import { redirect } from 'next/navigation';

export default async function CreateEventPage() {
  // 创建活动数据
  try {
    const events = [
      {
        title: "福建商会年度会议2024",
        date: "2024-04-01",
        time: "14:00",
        description: "2024年度会员大会，共同探讨闽商发展机遇与挑战",
        location: "福州世茂洲际酒店",
        address: "福州市台江区江滨西大道198号",
        price: "免费",
        image: "https://example.com/image1.jpg",
        maxCapacity: 200,
        organizer: "福建省商会",
        contactEmail: "contact@fjsh.com",
        contactPhone: "0591-12345678",
        status: 'upcoming' as const
      },
      {
        title: "海丝之路企业家论坛",
        date: "2024-05-15",
        time: "09:30",
        description: "探讨'一带一路'倡议下闽商发展新机遇",
        location: "厦门国际会议中心",
        address: "厦门市思明区会展路198号",
        price: "299",
        image: "https://example.com/image2.jpg",
        maxCapacity: 100,
        organizer: "福建省国际贸易促进会",
        contactEmail: "business@fjsh.com",
        contactPhone: "0592-87654321",
        status: 'upcoming' as const
      },
      {
        title: "数字福建创新峰会",
        date: "2024-06-20",
        time: "13:30",
        description: "聚焦数字经济发展，展望福建科技创新未来",
        location: "福州软件园展览中心",
        address: "福州市鼓楼区软件大道89号",
        price: "免费",
        image: "https://example.com/image3.jpg",
        maxCapacity: 150,
        organizer: "福建省科技创新委员会",
        contactEmail: "tech@fjsh.com",
        contactPhone: "0591-98765432",
        status: 'upcoming' as const
      },
      {
        title: "闽商青年创业论坛",
        date: "2024-07-10",
        time: "15:00",
        description: "新时代闽商青年创新创业交流平台",
        location: "泉州晋江国际会展中心",
        address: "晋江市青阳街道会展路1号",
        price: "188",
        image: "https://example.com/image4.jpg",
        maxCapacity: 80,
        organizer: "福建省青年企业家协会",
        contactEmail: "youth@fjsh.com",
        contactPhone: "0595-34567890",
        status: 'upcoming' as const
      },
      {
        title: "海峡两岸经贸合作论坛",
        date: "2024-08-25",
        time: "10:00",
        description: "促进闽台经贸文化交流，共创两岸发展新机遇",
        location: "平潭国际会议中心",
        address: "平潭综合实验区国际会展中心",
        price: "500",
        image: "https://example.com/image5.jpg",
        maxCapacity: 120,
        organizer: "福建省台港澳事务办公室",
        contactEmail: "trade@fjsh.com",
        contactPhone: "0591-23456789",
        status: 'upcoming' as const
      }
    ];

    const newEvents = await insertManyEvents(events);
    
    console.log('成功创建活动:', newEvents.length, '条记录');
    
    // 创建成功后重定向到活动列表页
    redirect('/events');
  } catch (error) {
    console.error('创建活动失败:', error);
    throw error;
  }
} 