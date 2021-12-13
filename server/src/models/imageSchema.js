import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
    {
        quizId: { type: mongoose.Schema.Types.ObjectID, ref: 'Quiz' },
        platformId: { type: mongoose.Schema.Types.ObjectID, ref: 'Platform' },
        consumerId: { type: mongoose.Schema.Types.ObjectID, ref: 'Consumer'},
        creatorId: { type: mongoose.Schema.Types.ObjectID, ref: 'Creator' },
        url: { type: String },
        cloudinaryId: { type: String },
        fileName: { type: String },
    },
    {
        timestamps: true
    }
);
const Image = mongoose.model('Image', imageSchema);

export default Image;
