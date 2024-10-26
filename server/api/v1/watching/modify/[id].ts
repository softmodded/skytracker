import { toggleWatchingSkylander } from "~/utils/database";

export default eventHandler(async (event) => {
    const userid = event.context.user.id;
    const skylanderId = await getRouterParam(event, "id");
    if (!skylanderId) {
        throw createError({
            status: 400,
            message: "Missing skylander id",
        });
    }

    const result = await toggleWatchingSkylander(userid, skylanderId).catch((err) => {
        throw createError({
            status: 500,
            message: err,
        });
    });
    return { result: result };
});