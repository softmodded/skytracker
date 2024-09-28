import { fetchPartialSkylander } from "~/utils/database";
import { getSkylanderData } from "~/utils/scraper";

export default defineCachedEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    if (!id) {
        throw createError({
            status: 400,
            message: "id is required",
        })
    }

    const skylander = await fetchPartialSkylander(id);
    if (!skylander) {
        throw createError({
            status: 404,
            message: "skylander not found",
        });
    }

    const fullSkylander = await getSkylanderData(skylander);
    return fullSkylander;
}, { maxAge: 60 * 60 * 24 });