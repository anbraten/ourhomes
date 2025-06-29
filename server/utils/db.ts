import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import type { H3Event } from 'h3';

let db: ReturnType<typeof drizzle> | null = null;

export function useDb(event: H3Event) {
  if (db) {
    return db;
  }

  const config = useRuntimeConfig(event);
  const client = createClient({
    url: config.db.url,
    authToken: config.db.token,
  });
  db = drizzle(client);
  return db;
}

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  avatar: text('avatar').notNull(),
});
export type User = typeof usersTable.$inferSelect;

export const homesTable = sqliteTable('homes', {
  id: integer('id').primaryKey(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  name: text('name').notNull(),
  members: text('members', { mode: 'json' }),
});

export const feedItemsTable = sqliteTable('feed-items', {
  id: integer('id').primaryKey(),
  createdAt: integer('created-at', { mode: 'timestamp' }).notNull(),
  homeId: integer('home-id')
    .references(() => homesTable.id)
    .notNull(),
  type: text('type').$type<'note' | 'expense' | 'list'>().notNull(),
  author: integer('author')
    .references(() => usersTable.id)
    .notNull(),
  data: text('data', { mode: 'json' }).$type<unknown>().notNull(),
});
