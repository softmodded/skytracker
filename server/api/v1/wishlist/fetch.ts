import { fetchWishlist } from "~/utils/database";

export default eventHandler(async (event) => {
    const userid = event.context.user.id;
    const watching = await fetchWishlist(userid);
    return watching;
});