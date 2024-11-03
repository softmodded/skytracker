import { toggleCollectionSkylander } from "~/utils/database";

export default eventHandler(async (event) => {
    const userid = event.context.user.id;
    const skylander = getRouterParam(event, "id");

    if (!skylander) {
        throw createError({
            status: 400,
            message: "Missing id parameter"
        });
    }

    const result = await toggleCollectionSkylander(userid, skylander).catch((err) => {
        throw createError({
            status: 500,
            message: err,
        });
    });
    return { result: result };
});