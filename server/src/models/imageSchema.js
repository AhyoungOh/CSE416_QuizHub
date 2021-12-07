import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
    {
        url: { type: String },
    },
    {
        timestamps: true
    }
);
const Image = mongoose.model('Image', imageSchema);

export default Image;
