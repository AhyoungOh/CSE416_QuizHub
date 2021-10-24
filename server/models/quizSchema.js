import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  quizImage: { data: Buffer, type: String },
  platformName: { type: String, required: true },
  quizName: { type: String, required: true },
  quizDescription: String,
  quizNumberOfTrials: Number,
  quizTimeLimit: {
    minutes: { type: Number, required: true },
    seconds: { type: Number, required: true },
  },
  quizTotalNumberOfQuestions: Number,
  quizRewardType: { type: Number, required: true, default: 0 },
  quizCertificate: { type: mongoose.Schema.Types.ObjectID, ref: 'Certificate' },
  quizBadge: { type: mongoose.Schema.Types.ObjectID, ref: 'Badge' },
  quizCertificateQualification: Number,
  quizBadgeQualification: Number,
  quizLeaderBoardId: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'LeaderBoard',
  }, 
  quizEnableLeaderboard: { type: Boolean, default: true },
  quizQuestions: { type: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Question' }] },
  createdDate: { type: Date, default: Date.now },
});
const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;

