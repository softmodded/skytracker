import mongoose from "mongoose";
import DailyMetadata from "~/schemas/dailyMetadata";
import PartialSkylander from "~/schemas/partialSkylander";
import { config } from "dotenv";
import User from "~/schemas/user";
import { createClerkClient } from "@clerk/backend";

export const clerkClient = createClerkClient({ secretKey: process.env.NUXT_CLERK_SECRET_KEY });

config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/skylanders");

export async function fetchPartialSkylanders(): Promise<PartialSkylander[]> {
  const skylanders: PartialSkylander[] = await PartialSkylander.find();
  return skylanders;
}

export async function savePartialSkylander(
  data: PartialSkylander
): Promise<void> {
    data.category = data.category.toLowerCase();
    data.category = data.category.replaceAll(" ", "-");
  const skylander = new PartialSkylander(data);
  await skylander.save();
}

export async function wipePartialSkylanders(): Promise<void> {
  await PartialSkylander.deleteMany({});
}

export async function fetchPartialSkylander(
  id: string
): Promise<PartialSkylander | null> {
  const skylander: PartialSkylander | null = await PartialSkylander.findOne({
    _id: id,
  });

  return skylander;
}

export async function fetchPartialSkylandersByCategory(
  category: Category
): Promise<PartialSkylander[]> {
  const skylanders: PartialSkylander[] = await PartialSkylander.find({
    category,
  });
  return skylanders;
}

export async function fetchPartialSkylandersByGame(
  game: Game
): Promise<PartialSkylander[]> {
  const skylanders: PartialSkylander[] = await PartialSkylander.find({ game });
  return skylanders;
}

async function getRandomSkylander(): Promise<PartialSkylander> {
  const skylanders: PartialSkylander[] = await fetchPartialSkylanders();
  const randomIndex = Math.floor(Math.random() * skylanders.length);
  return skylanders[randomIndex];
}

export async function getDailyMetadata(date: Date): Promise<DailyMetadata> {
  const dateNoTime = new Date(date);
  dateNoTime.setHours(0, 0, 0, 0);

  const metadata: DailyMetadata | null = await DailyMetadata.findOne({
    date: dateNoTime,
  });


  if (metadata === null) {
    const skylander = await getRandomSkylander();
    if (!skylander) {
      throw new Error("No skylanders found");
    }

    const newMetadata = new DailyMetadata({ date: dateNoTime, skylander: skylander._id });
    await newMetadata.save();

    // @ts-ignore
    return newMetadata as DailyMetadata;
  }

  return metadata;
}

// this function SUCKS!! 
export async function getPageOfPartials(page: number, filter?: Object): Promise<PartialSkylander[]> {
  if (filter) {
    // @ts-ignore
    if (filter["game"]) {
          // @ts-ignore
      const skylanders: PartialSkylander[] = await PartialSkylander.find({ game: filter["game"] })
      return skylanders;
      // @ts-ignore
    } else if (filter["category"]) {
          // @ts-ignore
      const skylanders: PartialSkylander[] = await PartialSkylander.find({ category: filter["category"] })
      return skylanders;
      // @ts-ignore
    } else if (filter["element"]) {
          // @ts-ignore
      const skylanders: PartialSkylander[] = await PartialSkylander.find({ element: filter["element"] })
      return skylanders;
    }
  }

  // @ts-ignore
  const skylanders: PartialSkylander[] = await PartialSkylander.find().skip((page - 1) * 25).limit(25);
  return skylanders;
}

export async function search(term: String, related: Boolean): Promise<PartialSkylander[]> {
  const words = term.replaceAll("%20", " ").split(" ");
  if (words.length > 1 && related) {
    const resultsAll: PartialSkylander[] = [];
    for (const word of words) {
      const results = await search(word, true);
      resultsAll.push(...results);
    }
    return resultsAll;
  }
  
  const skylanders: PartialSkylander[] = await PartialSkylander.find({
    name: { $regex: term, $options: "i" },
  });
  return skylanders;
}

export async function fetchUser(id: string): Promise<User | null> {
  const user: User | null = await User.findOne({ id });
  if (!user) {
    console.log(id)
    const clerkUser = await clerkClient.users.getUser(id)
    if (!clerkUser) {
      return null;
    };
    const newUser = new User({ id, wishlist: [], figures: [], watching: [], notifications: [] });
    await newUser.save();

    // @ts-ignore
    return newUser as User;
  }

  return user;
}

export async function fetchWatchingSkylanders(userId: string, mine: boolean): Promise<PartialSkylander[]> {
  const user = await fetchUser(userId);
  if (!user) {
    return [];
  }

  if (!mine && user.settings.watchingVisibility === false) {
    return [];
  }


  const skylanders: PartialSkylander[] = await PartialSkylander.find({
    _id: { $in: user.watching },
  });
  return skylanders;
}

export async function toggleWatchingSkylander(userId: string, skylanderId: string): Promise<boolean> {
  const user = await fetchUser(userId);
  if (!user) {
    throw new Error("User not found");
  }

  let result

  const index = user.watching.indexOf(skylanderId);
  if (index === -1) {
    user.watching.push(skylanderId);
    result = true;
    
  } else {
    user.watching.splice(index, 1);
    result = false;
  }

  // @ts-ignore
  await user.save();
  return result;
}

export async function toggleCollectionSkylander(userId: string, skylanderId: string): Promise<boolean> {
  const user = await fetchUser(userId);
  if (!user) {
    throw new Error("User not found");
  }

  let result

  const index = user.figures.indexOf(skylanderId);
  if (index === -1) {
    user.figures.push(skylanderId);
    result = true;
    
  } else {
    user.figures.splice(index, 1);
    result = false;
  }

  // @ts-ignore
  await user.save();
  return result;
}

export async function fetchMessages(userId: string) {
  const user = await fetchUser(userId);
  if (!user) {
    return [];
  }

  return user.notifications;
}

export async function fetchCollection(userId: string, mine: boolean): Promise<PartialSkylander[]> {
  const user = await fetchUser(userId);
  if (!user) {
    return [];
  }

  if (!mine && user.settings.collectionVisibility === false) {
    return [];
  }

  const skylanders: PartialSkylander[] = await PartialSkylander.find({
    _id: { $in: user.figures },
  });
  return skylanders;
}

export async function toggleWishlist(userId: string, skylanderId: string): Promise<boolean> {
  const user = await fetchUser(userId);
  if (!user) {
    throw new Error("User not found");
  }

  let result

  const index = user.wishlist.indexOf(skylanderId);
  if (index === -1) {
    user.wishlist.push(skylanderId);
    result = true;
    
  } else {
    user.wishlist.splice(index, 1);
    result = false;
  }

  // @ts-ignore
  await user.save();
  return result;
}

export async function fetchWishlist(userId: string, mine: boolean): Promise<PartialSkylander[]> {
  const user = await fetchUser(userId);
  if (!user) {
    return [];
  }

  if (!mine && user.settings.wishlistVisibility === false) {
    return [];
  }

  const skylanders: PartialSkylander[] = await PartialSkylander.find({
    _id: { $in: user.wishlist },
  });
  return skylanders;
}

export async function fetchSettings(userId: string): Promise<Settings> {
  const user = await fetchUser(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return user.settings;
}

export async function modifySetting(userId: string, setting: string, value: any): Promise<void> {
  const user = await fetchUser(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // @ts-ignore
  user.settings[setting] = value;
  // @ts-ignore
  await user.save();
}