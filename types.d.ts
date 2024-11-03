interface PartialSkylander {
    name: string;
    link: string;
    image: string;
    category: string;
    game: string;
    price?: string;
    _id?: string | undefined;
}

interface Skylander extends PartialSkylander {
    element: string;
    releasedWith: string;
    series: string;
}

interface DailyMetadata {
    date: Date;
    skylander: PartialSkylander;
}

enum EnumGame {
    "spyros-adventure-figures",
    "giants-figures",
    "swap-force-figures",
    "trap-team-figures",
    "superchargers-figures",
    "imaginators-figures",
}

type Category = 
    | "All Skylanders Spyro's Adventure Characters"
    | "Spyro's Adventure Magic Items and Level Pieces"
    | "Spyro's Adventure In-Game Variants"
    | "Spyro's Adventure Chase Variants"
    | "Giant Skylanders"
    | "New (Series 1) Skylanders"
    | "Returning (Series 2) Skylanders"
    | "LightCore Skylanders"
    | "Skylanders Giants Magic Items (with Variants)"
    | "Skylanders Giants In-Game Variants"
    | "Skylanders Giants Chase Variants"
    | "SWAP Force Skylanders (Swappers)"
    | "New (Series 1) Skylanders"
    | "Returning (Series 2 and Series 3) Skylanders"
    | "LightCore Skylanders"
    | "SWAP Force Magic Items"
    | "Skylanders SWAP Force In-Game Variants"
    | "Skylanders SWAP Force Chase Variants"
    | "Trap Master Skylanders"
    | "New (Series 1) Skylanders"
    | "Returning (Series 2, 3, and 4) Skylanders"
    | "Mini Skylanders"
    | "Trap Team Magic Items (with Variants)"
    | "Skylanders Trap Team In-Game Variants"
    | "Skylanders Trap Team Chase Variants"
    | "Trap Team – Traptanium Crystal Traps"
    | "Trap Team – Traptanium Crystal Trap Variants"
    | "“Most Wanted” Trappable Villains"
    | "“Most Wanted” Trappable Villain Variants"
    | "SuperCharger Skylanders"
    | "In-Game Variant SuperCharger Skylanders"
    | "Chase Variant SuperCharger Skylanders"
    | "Vehicles"
    | "In-Game Variant Vehicles"
    | "Chase Variant Vehicles"
    | "Magic Items"
    | "Imaginator Skylanders Sensei"
    | "In-Game Variant Imaginator Skylanders Sensei"
    | "Chase Variant Imaginator Skylanders Sensei"
    | "Imaginator Villain Sensei"
    | "In-Game Variant Imaginator Villain Sensei"
    | "Chase Variant Imaginator Villain Sensei"
    | "Creation Crystals"
    | "Variant Creation Crystals"
    | "Magic Items";

type Game = "spyros-adventure-figures" | "giants-figures" | "swap-force-figures" | "trap-team-figures" | "superchargers-figures" | "imaginators-figures";

interface Update {
    date: Date;
    changes: string[];
}

interface User {
    id: string;
    wishlist: string[];
    figures: string[];
    watching: string[];
    notifications: string[];
    settings: Settings;
}

interface Notification {
    date: Date;
    message: string;
    title: string;
    _id: string;
}

interface Settings {
    collectionVisibility: boolean;
    wishlistVisibility: boolean;
    watchingVisibility: boolean;
    language: string;
}