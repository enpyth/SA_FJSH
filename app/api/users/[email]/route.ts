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
  } catch (error: any) {
    return NextResponse.json({ 
      message: 'Error fetching user',
      error: error.message 
    }, { status: 500 });
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
  } catch (error: any) {
    return NextResponse.json({ 
      message: 'Error deleting user',
      error: error.message 
    }, { status: 500 });
  }
} 