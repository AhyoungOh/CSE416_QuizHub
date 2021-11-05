import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  quizImage: { data: Buffer, type: String },
  platformName: { type: mongoose.Schema.Types.ObjectId, ref: 'Platform' },
  quizName: { type: String },
  quizDescription: String,
  quizNumberOfTrials: Number,
  quizTimeLimit: {
    minutes: { type: Number },
    seconds: { type: Number },
  },
  quizTotalNumberOfQuestions: Number,
  quizRewardType: { type: Number, default: 0 },
  quizCertificate: { type: mongoose.Schema.Types.ObjectID, ref: 'Certificate' },
  quizBadge: { type: mongoose.Schema.Types.ObjectID, ref: 'Badge' },
  quizCertificateQualification: Number,
  quizBadgeQualification: Number,
  quizEnableLeaderboard: { type: Boolean, default: true },
  quizQuestions: { type: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Question' }] },
  createdDate: { type: Date, default: Date.now },
});
const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;

