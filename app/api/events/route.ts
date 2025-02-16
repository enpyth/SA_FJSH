import { NextResponse } from 'next/server';
import { createEvent } from '@/src/queries/insert';
import { getAllEvents, getUpcomingEvents } from '@/src/queries/select';

// 获取所有活动或即将举行的活动
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    let events;
    if (type === 'upcoming') {
      events = await getUpcomingEvents();
    } else {
      events = await getAllEvents();
    }
    
    // console.log('API events:', events);
    return NextResponse.json(events);
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ error: 'An unknown error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// 创建新活动
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newEvent = await createEvent(data);
    
    return NextResponse.json({
      message: 'Event created successfully',
      event: newEvent
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ error: 'An unknown error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 