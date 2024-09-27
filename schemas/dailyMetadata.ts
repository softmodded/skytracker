import mongoose from 'mongoose';

const dailyMetadataSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true,
        default: new Date()
    },
    skylander: String
});

const DailyMetadata = mongoose.model('DailyMetadata', dailyMetadataSchema);

export default DailyMetadata;