import { pgTable, serial, text, varchar, integer, pgEnum } from 'drizzle-orm/pg-core';

export const usersAuthTable = pgTable('fjsh_users_auth', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
});

export const usersProfileTable = pgTable('fjsh_users_profile', {
  email: text('email')
    .primaryKey()
    .references(() => usersAuthTable.email, { onDelete: 'cascade' }),
  logo: text('logo'),
  introduction: text('introduction'),
});

export const eventStatusEnum = pgEnum('event_status', ['upcoming', 'past']);

export const eventsTable = pgTable('fjsh_events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  date: text('date').notNull(),
  time: text('time').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  address: text('address').notNull(),
  price: text('price').notNull(),
  image: text('image'),
  registeredCount: integer('registered_count').notNull().default(0),
  maxCapacity: integer('max_capacity').notNull(),
  organizer: text('organizer').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone').notNull(),
  status: eventStatusEnum('status').notNull().default('upcoming'),
});

export type InsertUserAuth = typeof usersAuthTable.$inferInsert;
export type SelectUserAuth = typeof usersAuthTable.$inferSelect;

export type InsertUserProfile = typeof usersProfileTable.$inferInsert;
export type SelectUserProfile = typeof usersProfileTable.$inferSelect;

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;
