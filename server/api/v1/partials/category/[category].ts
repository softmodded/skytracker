import { fetchPartialSkylandersByCategory } from "~/utils/database";

export default defineEventHandler(async (event) => {
  let category = getRouterParam(event, "category");
  if (!category) {
    throw createError({
        status: 400,
        message: "cat is required",
    })
  }

  const skylander = await fetchPartialSkylandersByCategory(category as Category);
  if (!skylander || skylander.length === 0) {
    throw createError({
        status: 404,
        message: "category/skylanders not found",
    });
  }

  return skylander;
});
