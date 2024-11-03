export default eventHandler(async (event) => {
    const settings = {
        "website": {
            "options": {
                "language": "string"
            },
            "icon": "material-symbols:language"
        },
        "privacy": {
            "options": {
                "collectionVisibility": "boolean",
                "wishlistVisibility": "boolean",
                "watchingVisibility": "boolean"
            },
            "icon": "material-symbols:visibility-lock-outline"
        }
    }

    return {
        ...settings,
        categories: Object.keys(settings)
    };
});