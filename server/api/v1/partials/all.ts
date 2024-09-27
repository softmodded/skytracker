import { fetchPartialSkylanders } from "~/utils/database"

export default defineEventHandler(async (event) => {
    const skylanders = await fetchPartialSkylanders();
    return skylanders;
})