import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  quizImage: { type: String, default: '' },
  platformId: { type: String },
  quizName: { type: String },
  quizDescription: { type: String, default: '' },
  quizNumberOfTrials: Number,
  quizTimeLimit: {
    minutes: { type: Number },
    seconds: { type: Number },
  },
  quizTotalNumberOfQuestions: Number,
  quizRewardType: { type: String },
  // quizCertificate: { type: mongoose.Schema.Types.ObjectID, ref: 'Certificate' },
  // quizBadge: { type: mongoose.Schema.Types.ObjectID, ref: 'Badge' },
  quizCertificateQualification: Number,
  quizBadgeQualification: Number,
  quizEnableLeaderboard: { type: Boolean, default: true },
  quizQuestions: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Question' }],
  createdDate: { type: Date, default: Date.now },
});
const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
