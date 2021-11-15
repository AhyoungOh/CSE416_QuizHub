import mongoose from 'mongoose';

const platformSchema = new mongoose.Schema({
  platformName: { type: String },
  platformDescription: { type: String, default: '' },
  platformImage: { type: String, default: '' },
  ownedQuizzes: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Quiz' }],
  createdDate: { type: Date },
});
const Platform = mongoose.model('Platform', platformSchema);

export default Platform;
