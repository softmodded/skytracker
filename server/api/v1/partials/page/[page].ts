import { getPageOfPartials } from "~/utils/database";

export default defineEventHandler(async (event) => {
    const page = getRouterParam(event, 'page');
    if (!page) {
        throw createError({
            status: 400,
            message: 'The page parameter is required',
        })
    }

    const filter = getQuery(event);

    const partials = await getPageOfPartials(Number(page), filter);
    return partials;
});