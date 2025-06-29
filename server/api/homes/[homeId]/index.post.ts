import { useDb, homesTable } from '~/server/utils/db';

export default defineEventHandler(async (event) => {
  const db = useDb(event);
  const body = await readBody(event);
  const [created] = await db.insert(homesTable).values(body).returning();
  return { created };
});
