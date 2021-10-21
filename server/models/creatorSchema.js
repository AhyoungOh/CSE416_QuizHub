import mongoose from 'mongoose';

const creatorSchema = new mongoose.Schema({
  ownedPlatforms: {
    platformName: { type: String, required: true },
    platformDescription: { type: String },
    platformImage: { data: Buffer, type: String },
    ownedQuizzes: {
      quizId: { type: String },
    },
    createdDate: { type: Date },
  },
  creatorImage: { data: Buffer, type: String },
  selfIntroduction: { type: String },
  creatorUsername: { type: String },
  creatorEmail: { type: String },
  password: { type: String },
});
const Creator = mongoose.model('Creator', creatorSchema);

export default Creator;
