import { eq } from 'drizzle-orm';
import { db } from '../db';
import { usersAuthTable, usersProfileTable } from '../schema';

export async function deleteUserAuth(email: string) {
  // 由于设置了级联删除，删除 auth 记录会自动删除对应的 profile
  const [deleted] = await db
    .delete(usersAuthTable)
    .where(eq(usersAuthTable.email, email))
    .returning();
  return deleted;
}

export async function deleteUserProfile(email: string) {
  const [deleted] = await db
    .delete(usersProfileTable)
    .where(eq(usersProfileTable.email, email))
    .returning();
  return deleted;
}
