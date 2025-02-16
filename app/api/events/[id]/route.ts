import { NextResponse } from 'next/server';
import { getEventById } from '@/src/queries/select';

// 使用 NextRequest 类型并正确定义 context 参数
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const event = await getEventById(parseInt(id));
    
    if (!event) {
      return NextResponse.json({ 
        message: 'Event not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json(event);
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