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

export async function updateUserProfile(
  email: string,
  data: Partial<Omit<InsertUserProfile, 'email'>>
) {
  const [updated] = await db
    .update(usersProfileTable)
    .set(data)
    .where(eq(usersProfileTable.email, email))
    .returning();
  return updated;
}
