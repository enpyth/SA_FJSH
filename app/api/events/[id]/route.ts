import { NextResponse } from 'next/server';
import { getEventById } from '@/src/queries/select';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params;
    const event = await getEventById(parseInt(id));
    
    if (!event) {
      return NextResponse.json({ 
        message: 'Event not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json(event);
  } catch (error: any) {
    return NextResponse.json({ 
      message: 'Error fetching event',
      error: error.message 
    }, { status: 500 });
  }
} 