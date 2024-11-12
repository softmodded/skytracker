export default defineEventHandler(async (event) => {
    const releasesraw = await fetch('https://api.github.com/repos/softmodded/skytracker/events')
    const releases = await releasesraw.json()
    return releases[0].payload.head
});