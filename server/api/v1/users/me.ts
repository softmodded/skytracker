export default defineEventHandler(async (event) => {
  const user = event.context.user;

  if (!user) {
    throw createError({
      message: "User not found",
      status: 404,
    });
  }

  return user;
});
