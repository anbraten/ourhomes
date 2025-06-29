import { useDb, homesTable } from '~/server/utils/db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const db = useDb(event);
  const homeId = Number(event.context.params?.homeId);
  if (!homeId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid homeId' });
  }
  await db.delete(homesTable).where(eq(homesTable.id, homeId));
  return { deleted: true };
});
