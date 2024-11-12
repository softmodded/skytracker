export default defineCachedEventHandler(async (event) => {
    const settings = {
        "website": {
            "options": {
                "language": "string",
                "bio": "string",
            },
            "icon": "material-symbols:language"
        },
        "privacy": {
            "options": {
                "collectionVisibility": "boolean",
                "wishlistVisibility": "boolean",
                "watchingVisibility": "boolean",
                "trackers": "boolean",
            },
            "icon": "material-symbols:visibility-lock-outline"
        },
        "about": {
            icon: "material-symbols:info-outline",
        }
    }

    return {
        ...settings,
        categories: Object.keys(settings)
    };
});