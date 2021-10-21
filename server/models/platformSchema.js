import mongoose from 'mongoose';

const platformSchema = new mongoose.Schema({
  platformName: { type: String, required: true },
  platformDescription: { type: String },
  platformImage: { data: Buffer, type: String },
  ownedQuizzes: {
    quizId: { type: String },
  },
  createdDate: { type: Date, default: Date.now},
});
const Platform = mongoose.model('Platform', platformSchema);

export default Platform;
