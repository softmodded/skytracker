import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    message: String,
    date: Date,
    read: Boolean,
}, { versionKey: false });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;