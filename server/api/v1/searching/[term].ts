import { search } from "~/utils/database";
import { filterString } from "~/utils/string";

export default defineEventHandler(async (event) => {
    const term = getRouterParam(event, "term");
    const query = getQuery(event);
    if (!term) {
        throw createError({
            status: 400,
            message: "term is required",
        })
    }

    const results = await search(filterString(term), query.related as Boolean);

    return results;
});