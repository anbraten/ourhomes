import { useDb, homesTable } from '~/server/utils/db';
import { inArray } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const db = useDb(event);

  const userId = 2; // TODO: get proper user

  const homes = await db
    .select()
    .from(homesTable)
    // .where(inArray(homesTable.members, [userId]))
    .all();
  return homes;
});
