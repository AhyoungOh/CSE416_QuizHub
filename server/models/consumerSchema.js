import mongoose from 'mongoose';

const consumerSchema = new mongoose.Schema({
  consumerDescription: { type: String },
  consumerImage: { type: Number, default: 0 },
  consumerUsername: { type: String },
  consumerEmail: { type: String },
  password: { type: String },
  consumerIsPrivate: { type: Boolean, default: false },
  consumerQuizHistoryList: [
    {
      Quizzes: {
        quizId: { type: mongoose.Schema.Types.ObjectID, ref: 'Quiz' },
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
      certificateId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Certificate',
      },
      accomplishedDate: { type: Date },
    },
  ],
  badges: [
    {
      badgeId: { type: mongoose.Schema.Types.ObjectID, ref: 'Badge' },
      accomplishedDate: { type: Date },
      badgeVisibility: { type: Boolean },
    },
  ],
});
const Consumer = mongoose.model('Consumer', consumerSchema);

export default Consumer;
