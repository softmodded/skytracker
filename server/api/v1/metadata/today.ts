import { getDailyMetadata } from "~/utils/database";

export default defineCachedEventHandler(async (event) => {
    const metadata = await getDailyMetadata(new Date());
    return metadata;
});