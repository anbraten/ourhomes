import { useDb, feedItemsTable } from '~/server/utils/db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const db = useDb(event);
  const homeId = Number(event.context.params?.homeId);
  if (!homeId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid homeId' });
  }
  const items = await db.select().from(feedItemsTable).where(eq(feedItemsTable.homeId, homeId)).all();
  return { items };
});
