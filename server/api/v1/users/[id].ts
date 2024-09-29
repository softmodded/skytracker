import { fetchUser } from "~/utils/database";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const user = await fetchUser(id as string);

  if (!user) {
    throw createError({
      message: "User not found",
      status: 404,
    });
  }

  return user;
});
