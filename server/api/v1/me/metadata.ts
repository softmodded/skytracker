import { clerkClient } from "~/utils/database"

export default defineEventHandler(async (event) => {
    const user = await clerkClient.users.getUser(event.context.user.id)
    return user.publicMetadata
});