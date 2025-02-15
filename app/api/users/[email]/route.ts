import { NextResponse } from 'next/server';
import { deleteUserAuth } from '@/src/queries/delete';
import { getUserAuthByEmail } from '@/src/queries/select';

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const user = await getUserAuthByEmail(params.email);
    
    if (!user) {
      return NextResponse.json({ 
        message: 'User not found' 
      }, { status: 404 });
    }

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error: any) {
    return NextResponse.json({ 
      message: 'Error fetching user',
      error: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const deletedUser = await deleteUserAuth(params.email);

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