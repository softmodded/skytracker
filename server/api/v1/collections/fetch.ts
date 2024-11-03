import { fetchCollection } from "~/utils/database";

export default eventHandler(async (event) => {
    const userid = event.context.user.id;
    const collections = await fetchCollection(userid);
    return collections;
});