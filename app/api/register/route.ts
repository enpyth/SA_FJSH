import { NextResponse } from 'next/server';
import { insertUserAuth, insertUserProfile } from '@/src/queries/insert';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // 从请求中解构数据时使用原始名称
    const { name, email, password } = await request.json();

    const hashedPassword = await hash(password, 10);

    const user = await insertUserAuth({
      name,
      email,
      password: hashedPassword
    });

    await insertUserProfile({ email });

    // 在解构 user 对象时使用不同的变量名
    const {...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'User registered successfully',
      user: userWithoutPassword
    }, { status: 201 });
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