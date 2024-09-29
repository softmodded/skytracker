import { search } from "~/utils/database";

export default defineEventHandler(async (event) => {
    const term = getRouterParam(event, "term");
    const query = getQuery(event);
    if (!term) {
        throw createError({
            status: 400,
            message: "term is required",
        })
    }

    const results = await search(term, query.related as Boolean);

    return results;
});