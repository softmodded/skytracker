import mongoose from "mongoose";

const skylanderSchema = new mongoose.Schema({
  name: String,
  link: String,
  image: String,
  category: String,
  game: String,
  element: String,
  releasedWith: String,
  series: String,
  price: String,
  links: {
    ebay: String, 
    amazon: String
  }
}, { versionKey: false });

const PartialSkylander = mongoose.model("PartialSkylander", skylanderSchema);

export default PartialSkylander;