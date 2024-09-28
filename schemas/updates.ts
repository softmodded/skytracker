import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
    date: Date,
    changes: [String],
}, { versionKey: false });

const Update = mongoose.model("Update", updateSchema);

export default Update;