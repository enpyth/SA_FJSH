import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

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

export type InsertUserAuth = typeof usersAuthTable.$inferInsert;
export type SelectUserAuth = typeof usersAuthTable.$inferSelect;

export type InsertUserProfile = typeof usersProfileTable.$inferInsert;
export type SelectUserProfile = typeof usersProfileTable.$inferSelect;
