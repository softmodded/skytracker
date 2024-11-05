import { clerkClient } from "~/utils/database";

export default eventHandler(async (event) => {
    const username = getRouterParam(event, "username");

    if (!username) {
        throw createError({
            status: 400,
            message: "Missing username",
        });
    }


    const result = await clerkClient.users.getUserList({
        username: [username],
    })

    if (result.data.length === 0) {
        throw createError({
            status: 404,
            message: "User not found",
        });
    }

    return { username: result.data[0].username, id: result.data[0].id };
});
    