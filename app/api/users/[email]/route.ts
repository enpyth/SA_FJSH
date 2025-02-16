import { NextResponse } from 'next/server';
import { deleteUserAuth } from '@/src/queries/delete';
import { getUserProfile } from '@/src/queries/select';

export async function GET(
  request: Request,
  context: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await context.params;
    
    const user = await getUserProfile(email);
    
    if (!user) {
      return NextResponse.json({ 
        message: 'User not found' 
      }, { status: 404 });
    }

    return NextResponse.json(user);
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

export async function DELETE(
  request: Request,
  context: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await context.params;

    const deletedUser = await deleteUserAuth(email);

    if (!deletedUser) {
      return NextResponse.json({ 
        message: 'User not found' 
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User deleted successfully'
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