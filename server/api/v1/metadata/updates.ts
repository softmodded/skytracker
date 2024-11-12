export default defineCachedEventHandler(async (event) => {
    const releasesraw = await fetch('https://api.github.com/repos/softmodded/skytracker/releases')
    const releases = await releasesraw.json()
    return releases
});