import { useDb, feedItemsTable } from '~/server/utils/db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const db = useDb(event);
  const feedItemId = Number(event.context.params?.feedItemId);
  if (!feedItemId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid feedItemId' });
  }
  const feedItem = await db.select().from(feedItemsTable).where(eq(feedItemsTable.id, feedItemId)).get();
  if (!feedItem) {
    throw createError({ statusCode: 404, statusMessage: 'Feed item not found' });
  }
  return feedItem;
});
