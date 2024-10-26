import { fetchWatchingSkylanders } from "~/utils/database";

export default eventHandler(async (event) => {
    const userid = event.context.user.id;
    const watching = await fetchWatchingSkylanders(userid);
    return watching;
});