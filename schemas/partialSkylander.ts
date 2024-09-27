import mongoose from "mongoose";

const skylanderSchema = new mongoose.Schema({
  name: String,
  link: String,
  image: String,
  category: String,
  game: String,
}, { versionKey: false });

const PartialSkylander = mongoose.model("PartialSkylander", skylanderSchema);

export default PartialSkylander;