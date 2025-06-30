import { useDb, feedItemsTable } from '~/server/utils/db';
import { and, eq, type SQL } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const db = useDb(event);
  const homeId = Number(event.context.params?.homeId);
  if (!homeId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid homeId' });
  }

  const filterConditions: SQL[] = [];

  const { type: filterType } = getQuery<{ type?: string }>(event);
  if (filterType) {
    filterConditions.push(eq(feedItemsTable.type, filterType as 'note' | 'expense' | 'list'));
  }

  const items = await db
    .select()
    .from(feedItemsTable)
    .where(and(eq(feedItemsTable.homeId, homeId), ...filterConditions))
    .all();
  return items;
});
