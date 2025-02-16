import { NextResponse } from 'next/server';
import { createEvent } from '@/src/queries/insert';

export async function GET() {
  try {
    const newEvent = await createEvent({
      title: "商会年度会议",
      date: "2024-04-01",
      time: "14:00",
      description: "年度会员大会",
      location: "上海大酒店",
      address: "上海市浦东新区XX路XX号",
      price: "免费",
      image: "https://example.com/image.jpg",
      maxCapacity: 200,
      organizer: "上海商会",
      contactEmail: "contact@example.com",
      contactPhone: "021-12345678"
    });

    return NextResponse.json({
      message: 'Event created successfully',
      event: newEvent
    });
  } catch (error: any) {
    return NextResponse.json({ 
      message: 'Error creating event',
      error: error.message 
    }, { status: 500 });
  }
} 