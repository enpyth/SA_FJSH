import { eq } from 'drizzle-orm';
import { db } from '../db';
import { usersAuthTable, usersProfileTable } from '../schema';

export async function getUserAuthByEmail(email: string) {
  const [user] = await db
    .select()
    .from(usersAuthTable)
    .where(eq(usersAuthTable.email, email));
  return user;
}

export async function getUserAuthById(id: number) {
  const [user] = await db
    .select()
    .from(usersAuthTable)
    .where(eq(usersAuthTable.id, id));
  return user;
}

export async function getUserProfile(email: string) {
  const [profile] = await db
    .select()
    .from(usersProfileTable)
    .where(eq(usersProfileTable.email, email));
  return profile;
}

export async function getFullUserInfo(email: string) {
  const [result] = await db
    .select({
      auth: usersAuthTable,
      profile: usersProfileTable
    })
    .from(usersAuthTable)
    .leftJoin(
      usersProfileTable,
      eq(usersAuthTable.email, usersProfileTable.email)
    )
    .where(eq(usersAuthTable.email, email));
  return result;
}