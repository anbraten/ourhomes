import { useDb, homesTable } from '~/server/utils/db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const db = useDb(event);
  const homeId = Number(event.context.params?.homeId);
  if (!homeId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid homeId' });
  }
  const body = await readBody(event);
  await db.update(homesTable).set(body).where(eq(homesTable.id, homeId));
  const updated = await db.select().from(homesTable).where(eq(homesTable.id, homeId)).get();
  return { updated };
});
