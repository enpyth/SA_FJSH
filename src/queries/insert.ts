import { db } from '../db';
import { InsertUserAuth, InsertUserProfile, usersAuthTable, usersProfileTable, InsertEvent, eventsTable } from '../schema';

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

// 插入单个活动
export async function insertEvent(event: InsertEvent) {
  try {
    const [newEvent] = await db
      .insert(eventsTable)
      .values(event)
      .returning();
    return newEvent;
  } catch (error) {
    console.error('Error in insertEvent:', error);
    throw error;
  }
}

// 批量插入活动
export async function insertManyEvents(events: InsertEvent[]) {
  try {
    const newEvents = await db
      .insert(eventsTable)
      .values(events)
      .returning();
    return newEvents;
  } catch (error) {
    console.error('Error in insertManyEvents:', error);
    throw error;
  }
}

// 创建活动的便捷方法（自动设置默认值）
export async function createEvent(
  event: Omit<InsertEvent, 'id' | 'registeredCount' | 'status'> & {
    registeredCount?: number;
    status?: 'upcoming' | 'past';
  }
) {
  try {
    // 设置默认值
    const eventWithDefaults: InsertEvent = {
      ...event,
      registeredCount: event.registeredCount || 0,
      status: event.status || 'upcoming'
    };

    const [newEvent] = await db
      .insert(eventsTable)
      .values(eventWithDefaults)
      .returning();
    return newEvent;
  } catch (error) {
    console.error('Error in createEvent:', error);
    throw error;
  }
}
