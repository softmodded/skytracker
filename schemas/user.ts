import mongoose from "mongoose";

const Notification = new mongoose.Schema({
    title: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, id: true });

const Settings = new mongoose.Schema({
    collectionVisibility: {
        type: Boolean,
        default: true
    },
    wishlistVisibility: {
        type: Boolean,
        default: true
    },   
    watchingVisibility: {
        type: Boolean,
        default: true
    },
    language: {
        type: String,
        default: "english"
    }
}, { versionKey: false, id: false });

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    wishlist: [String],
    figures: [String],
    watching: [String],
    notifications: [Notification],
    settings: {
        type: Settings,
        default: {
            collectionVisibility: true,
            wishlistVisibility: true,
            watchingVisibility: true,
            language: "english",
            trackers: true
        }
    }
}, { versionKey: false, id: false });

const User = mongoose.model("User", userSchema);

export default User;