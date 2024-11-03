import { fetchMessages } from "~/utils/database";

export default eventHandler(async (event) => {
    const userid = event.context.user.id;
    const notifications = fetchMessages(userid);
    return notifications;
});