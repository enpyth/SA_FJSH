import { db } from '../db';
import { InsertUserAuth, InsertUserProfile, usersAuthTable, usersProfileTable } from '../schema';

export async function insertUserAuth(user: InsertUserAuth) {
  const [newUser] = await db
    .insert(usersAuthTable)
    .values(user)
    .returning();
  return newUser;
}

export async function insertUserProfile(profile: InsertUserProfile) {
  const [newProfile] = await db
    .insert(usersProfileTable)
    .values(profile)
    .returning();
  return newProfile;
}

// 创建完整用户（包含认证和档案）的便捷方法
export async function createFullUser(
  auth: Omit<InsertUserAuth, 'id'>,
  profile: Omit<InsertUserProfile, 'email'>
) {
  const newUser = await insertUserAuth(auth);
  const newProfile = await insertUserProfile({
    email: newUser.email,
    ...profile
  });
  return { auth: newUser, profile: newProfile };
}
