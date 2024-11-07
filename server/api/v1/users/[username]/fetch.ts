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

    const user = result.data[0];

    return { username: user.username, id: user.id, banned: user.banned, firstName: user.firstName, publicMetadata: user.publicMetadata, lastOnline: user.lastActiveAt, createdAt: user.createdAt, image: user.imageUrl, hasImage: user.hasImage };
});
    