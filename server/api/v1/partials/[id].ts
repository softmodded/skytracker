import { fetchPartialSkylander } from "~/utils/database";

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "id");
  if (!name) {
    throw createError({
        status: 400,
        message: "id is required",
    })
  }

  const skylander = await fetchPartialSkylander(name);
  if (!skylander) {
    throw createError({
        status: 404,
        message: "skylander not found",
    });
  }

  return skylander;
});
