import mongoose from "mongoose";
import PartialSkylander from "~/schemas/partialSkylander";

mongoose.connect("mongodb://localhost/skylanders");

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
