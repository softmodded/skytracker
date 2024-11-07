import { clerkClient } from "~/utils/database";

export default eventHandler(async (event) => {
    const body = await readBody(event);
    const bio = await JSON.parse(body).bio;
    const result = await clerkClient.users.updateUserMetadata(event.context.user.id, { publicMetadata: { bio: bio } });
    return { bio: bio };
});