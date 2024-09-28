import { getUpdates } from "~/utils/database";

export default defineEventHandler(async (event) => {
    const updates = await getUpdates();
    return updates;
});