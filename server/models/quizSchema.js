import mongoose from 'mongoose';
import Certificate from './certificateSchema.js';
import Badge from './badgeSchema.js';
import Leaderboard from './leaderboardSchema.js';

const quizSchema = new Schema({
    quizImage: { data: Buffer, type: String },
    platformName: { type: String, required: true },
    quizName: { type: String, required: true },
    quizDescription: String,
    quizNumberOfTrials: Number, 
    quizTimeLimit: {
      minutes: { type: Number, required: true },
      seconds: { type: Number, required: true }
    },
    quizTotalNumberOfQuestions: Number,
    quizRewardType: { type: Number, required: true },
    quizCertificate: [Certificate],
    quizBadge: Badge,
    quizCertificateQualification: Number,
    quizBadgeQualification: Number,
    quizLeaderBoardId: Leaderboard,
    quizEnableLeaderboard: { type: Boolean, default: true },
    quizQuestions: [{
      questionNumber: Number,
      question: String,
      questionOptions: [String],
      questionAnswer: Number
    }]
  }, {
    timestamps: true,
});
const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;