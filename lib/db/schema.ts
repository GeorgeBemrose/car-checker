import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';


export const govApiTokens = pgTable('gov_api_token', {
  id: serial('id').primaryKey(),
  token: text('token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export type NewUser = typeof users.$inferInsert;
