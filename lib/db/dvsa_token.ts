import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { govApiTokens } from './schema';
import { sql } from 'drizzle-orm';

export async function query(text: string, params?: any[]) {
  return await db.execute(sql.raw(`${text}${params ? ' ' + params.join(', ') : ''}`));
}

export async function createTokenTable() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS gov_api_token (
      id SERIAL PRIMARY KEY,
      token TEXT NOT NULL,
      expires_at TIMESTAMP NOT NULL
    )
  `);
}

export async function getStoredToken() {
  const result = await db
    .select()
    .from(govApiTokens)
    .orderBy(desc(govApiTokens.expiresAt))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function storeToken(token: string, expiresAt: Date) {
  await db.insert(govApiTokens).values({
    token,
    expiresAt,
  });
}

export async function deleteExpiredTokens() {
  await db
    .delete(govApiTokens)
    .where(sql`${govApiTokens.expiresAt} < NOW()`);
}

