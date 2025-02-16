import { eq } from 'drizzle-orm';
import { db } from '@/src/db';
import { eventsTable, usersAuthTable, usersProfileTable } from '../schema';
import { desc, sql } from 'drizzle-orm';

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

// 获取所有活动
export async function getAllEvents() {
  try {
    const events = await db
      .select()
      .from(eventsTable)
      .orderBy(desc(eventsTable.date));
    
    return events;
  } catch (error) {
    console.error('Error in getAllEvents:', error);
    throw error;
  }
}

// 获取即将举行的活动
export async function getUpcomingEvents() {
  try {
    const events = await db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.status, 'upcoming'))
      .orderBy(desc(eventsTable.date));
    
    return events;
  } catch (error) {
    console.error('Error in getUpcomingEvents:', error);
    throw error;
  }
}

// 根据ID获取活动详情
export async function getEventById(id: number) {
  try {
    const [event] = await db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.id, id));
    
    return event;
  } catch (error) {
    console.error('Error in getEventById:', error);
    throw error;
  }
}

// 获取已结束的活动
export async function getPastEvents() {
  try {
    const events = await db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.status, 'past'))
      .orderBy(desc(eventsTable.date));
    
    return events;
  } catch (error) {
    console.error('Error in getPastEvents:', error);
    throw error;
  }
}

// 分页获取活动
export async function getEventsPaginated(
  page: number = 1,
  pageSize: number = 10,
  status?: 'upcoming' | 'past'
) {
  try {
    // 构建基础查询条件
    const baseWhere = status ? eq(eventsTable.status, status) : undefined;

    // 获取活动列表
    const events = await db
      .select()
      .from(eventsTable)
      .where(baseWhere)
      .orderBy(desc(eventsTable.date))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    // 获取总数
    const [{ count }] = await db
      .select({
        count: sql<number>`count(*)`
      })
      .from(eventsTable)
      .where(baseWhere);

    return {
      events,
      total: Number(count),
      page,
      pageSize,
      totalPages: Math.ceil(Number(count) / pageSize)
    };
  } catch (error) {
    console.error('Error in getEventsPaginated:', error);
    throw error;
  }
}