import { fetchSettings } from "~/utils/database";

export default defineEventHandler(async (event) => {
  const id = event.context.user.id;

  const settings = await fetchSettings(id);

  return settings;
});
