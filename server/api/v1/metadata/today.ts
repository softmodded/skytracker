import { getDailyMetadata } from "~/utils/database";

export default defineEventHandler(async (event) => {
    const metadata = await getDailyMetadata(new Date());
    return metadata;
});