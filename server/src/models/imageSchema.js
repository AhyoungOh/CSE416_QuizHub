import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
    {
        quizId: { type: mongoose.Schema.Types.ObjectID, ref: 'Quiz' },
        url: { type: String },
        cloudinaryId: { type: String },
        fileName: { type: String },
        // kind: { type: String },
    },
    {
        timestamps: true
    }
);
const Image = mongoose.model('Image', imageSchema);

export default Image;
