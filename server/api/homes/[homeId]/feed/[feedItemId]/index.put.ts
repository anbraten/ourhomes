import { useDb, feedItemsTable } from '~/server/utils/db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const db = useDb(event);
  const feedItemId = Number(event.context.params?.feedItemId);
  if (!feedItemId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid feedItemId' });
  }
  const body = await readBody(event);
  await db.update(feedItemsTable).set(body).where(eq(feedItemsTable.id, feedItemId));
  const updated = await db.select().from(feedItemsTable).where(eq(feedItemsTable.id, feedItemId)).get();
  return { updated };
});
