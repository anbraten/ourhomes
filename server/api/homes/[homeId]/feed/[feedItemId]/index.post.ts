import { useDb, feedItemsTable } from '~/server/utils/db';

export default defineEventHandler(async (event) => {
  const db = useDb(event);
  const body = await readBody(event);
  const [created] = await db.insert(feedItemsTable).values(body).returning();
  return { created };
});
