import {
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';


export const govApiTokens = pgTable('gov_api_token', {
  id: serial('id').primaryKey(),
  token: text('token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

