import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
    {
        name: { type: String },
        url: { type: String },
        cloudinary_id: { type: String },
        folder: { type: String },
    },
    {
        timestamps: true
    }
);
const Image = mongoose.model('Image', imageSchema);

export default Image;
