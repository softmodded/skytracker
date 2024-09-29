import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: String,
    wishlist: [String],
    figures: [String],
    watching: [String],
    notifications: [String],
}, { versionKey: false, id: false });

const User = mongoose.model("User", userSchema);

export default User;