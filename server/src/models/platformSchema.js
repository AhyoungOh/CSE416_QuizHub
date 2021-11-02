import mongoose from 'mongoose';

const platformSchema = new mongoose.Schema({
  platformName: { type: String, required: true },
  platformDescription: { type: String },
  platformImage: { data: Buffer, type: String },
  ownedQuizzes: { type: mongoose.Schema.Types.ObjectID, ref: 'Quiz' },
  createdDate: { type: Date },
});
const Platform = mongoose.model('Platform', platformSchema);

export default Platform;
