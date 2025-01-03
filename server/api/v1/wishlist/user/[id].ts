import { fetchWishlist } from "~/utils/database";

export default eventHandler(async (event) => {
  const userid = getRouterParam(event, "id");
  if (!userid) {
    throw createError({
      status: 400,
      message: "Missing id",
    });
  }
  const watching = await fetchWishlist(userid, false);
  return watching;
});
