import { search } from "~/utils/database";

export default defineCachedEventHandler(async (event) => {
    const term = getRouterParam(event, "term");
    if (!term) {
        throw createError({
            status: 400,
            message: "term is required",
        })
    }

    const results = await search(term);

    return results;
});