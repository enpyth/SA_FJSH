import { eq } from 'drizzle-orm';
import { db } from '../db';
import { InsertUserAuth, InsertUserProfile, usersAuthTable, usersProfileTable } from '../schema';

export async function updateUserAuth(
  email: string,
  data: Partial<Omit<InsertUserAuth, 'id' | 'email'>>
) {
  const [updated] = await db
    .update(usersAuthTable)
    .set(data)
    .where(eq(usersAuthTable.email, email))
    .returning();
  return updated;
}

interface UpdateProfileData {
  logo?: string;
  introduction?: string;
  chineseName?: string;
  englishName?: string;
  driverLicenseNo?: string;
  birthplace?: string;
  wechatId?: string;
  birthDate?: string;
  address?: string;
  phoneNumber?: string;
  occupation?: string;
  companyName?: string;
  companyAddress?: string;
  referrer?: string;
}

export async function updateUserProfile(email: string, data: UpdateProfileData) {
  try {
    const [updatedProfile] = await db
      .update(usersProfileTable)
      .set(data)
      .where(eq(usersProfileTable.email, email))
      .returning();

    return updatedProfile;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}
