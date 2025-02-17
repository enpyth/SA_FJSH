import { NextRequest } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '@/src/db';
import { usersAuthTable, usersProfileTable } from '@/src/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      role,
      // 额外的个人信息字段
      chineseName,
      englishName,
      driverLicenseNo,
      birthplace,
      wechatId,
      birthDate,
      address,
      phoneNumber,
      occupation,
      companyName,
      companyAddress,
      referrer,
    } = await request.json();

    // 基本验证
    if (!email || !password || !name || !role) {
      return new Response(
        JSON.stringify({ error: '请填写所有必需字段' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 检查邮箱是否已存在
    const existingUser = await db
      .select()
      .from(usersAuthTable)
      .where(eq(usersAuthTable.email, email));

    if (existingUser.length > 0) {
      return new Response(
        JSON.stringify({ error: '该邮箱已被注册' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 企业会员和赞助商的必填字段验证
    if ((role === 'corporate' || role === 'sponsor') && 
        (!chineseName || !phoneNumber || !companyName)) {
      return new Response(
        JSON.stringify({ error: '企业会员和赞助商需要填写中文姓名、联络电话和公司名' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 加密密码
    const hashedPassword = await hash(password, 10);

    try {
      // 1. 插入认证信息
      await db.insert(usersAuthTable).values({
        name,
        email,
        password: hashedPassword,
      });

      // 2. 插入用户档案
      await db.insert(usersProfileTable).values({
        email,
        role,
        // 只有在企业会员和赞助商时才包含这些字段
        ...(role !== 'regular' && {
          chineseName,
          englishName,
          driverLicenseNo,
          birthplace,
          wechatId,
          birthDate,
          address,
          phoneNumber,
          occupation,
          companyName,
          companyAddress,
          referrer,
        }),
      });

      return new Response(
        JSON.stringify({ message: '注册成功' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (insertError) {
      // 如果插入失败，尝试清理已插入的数据
      try {
        await db.delete(usersAuthTable).where(eq(usersAuthTable.email, email));
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }

      throw insertError; // 重新抛出原始错误
    }

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: '注册过程中发生错误' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}