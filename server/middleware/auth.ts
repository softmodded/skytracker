import { verifyToken } from "@clerk/backend";
import { clerkClient } from "~/utils/database";

const authenticatedRoutes = [
    "/api/v1/users/me",
    "/api/v1/watching/fetch",
    "/api/v1/messages/fetch",
    "/api/v1/collections/fetch",
    "/api/v1/wishlist/fetch",
    "/api/v1/settings/me/fetch",
    "/api/v1/settings/me/update",
]

const includeRoutes = [
    "/api/v1/watching/modify",
    "/api/v1/collections/fetch",
    "/api/v1/collections/modify",
    "/api/v1/wishlist/modify",
    "/api/v1/settings/modify",
]

export default defineEventHandler(async (event) => {
    if (!event.path.startsWith("/api/v1")) return

    let included = false
    for (const route of includeRoutes) {
        if (event.path.includes(route)) {
            included = true
            break
        }
    }

    if (!authenticatedRoutes.includes(event.path) && included == false) return

    const authHeader = getHeader(event, "ST-Auth-Token")
    if (!authHeader || authHeader === "" || authHeader === "null" || authHeader === null) {
        throw createError({
            status: 401,
            message: "Missing ST-Auth-Token header"
        })
    }

    const tokenInfo = await verifyToken(authHeader, {
        secretKey: process.env.NUXT_CLERK_SECRET_KEY,
    }).catch((err) => {
        throw createError({
            status: 401,
            message: err
        })
    })

    event.context.token = tokenInfo

    if (!tokenInfo?.sub) {
        throw createError({
            status: 401,
            message: "Invalid token"
        })
    }

    const user = await clerkClient.users.getUser(tokenInfo.sub)

    if (!user) {
        throw createError({
            status: 401,
            message: "User not found"
        })
    }


    event.context.user = user
});