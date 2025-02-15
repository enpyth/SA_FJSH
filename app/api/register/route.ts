import { NextResponse } from 'next/server';
import { insertUserAuth, insertUserProfile } from '@/src/queries/insert';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // 密码加密
    const hashedPassword = await hash(password, 10);

    const user = await insertUserAuth({
      name,
      email,
      password: hashedPassword
    });

    await insertUserProfile({ email });

    // 不返回密码
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'User registered successfully',
      user: userWithoutPassword
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ 
      message: 'Error registering user',
      error: error.message 
    }, { status: 500 });
  }
}