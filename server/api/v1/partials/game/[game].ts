import { fetchPartialSkylandersByGame } from "~/utils/database";

export default defineEventHandler(async (event) => {
  const game = getRouterParam(event, "game");
  if (!game) {
    throw createError({
        status: 400,
        message: "game is required",
    })
  }

  const skylander = await fetchPartialSkylandersByGame(game as Game);
  if (!skylander || skylander.length === 0) {
    throw createError({
        status: 404,
        message: "game/skylanders not found",
    });
  }

  return skylander;
});
