import mongoose from 'mongoose';

const consumerSchema = new mongoose.Schema({
  consumerDescription: { type: String },
  consumerImage: { type: Number },
  consumerUsername: { type: String },
  consumerEmail: { type: String },
  password: { type: String },
  consumerIsPrivate: { type: Boolean },
  consumerQuizHistoryList: [
    {
      Quizzes: {
        quizId: { type: String },
        correctNumber: { type: Number },
        quizTimeTaken: {
          minutes: { type: Number },
          seconds: { type: Number },
        },
        accomplishedDate: { type: Date },
        usedTrialNumber: { type: Number },
      },
    },
  ],
  certificates: [
    {
      certificateId: { type: Number },
      accomplishedDate: { type: Date },
    },
  ],
  badges: [
    {
      badgeId: { type: Number },
      accomplishedDate: { type: Date },
      badgeVisibility: { type: Boolean },
    },
  ],
});
const Consumer = mongoose.model('Consumer', consumerSchema);

export default Consumer;
