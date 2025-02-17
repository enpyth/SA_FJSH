import { NextResponse } from 'next/server';
import { updateUserProfile } from '@/src/queries/update';

export async function PUT(request: Request) {
  try {
    const {
      email,
      logo,
      introduction,
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
      referrer
    } = await request.json();

    const updatedProfile = await updateUserProfile(email, {
      logo,
      introduction,
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
      referrer
    });

    if (!updatedProfile) {
      return NextResponse.json({ 
        message: 'Profile not found' 
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    });
  } catch (error) {
    console.error('Profile update error:', error);
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