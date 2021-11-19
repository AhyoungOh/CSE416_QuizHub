import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  consumerId: { type: mongoose.Schema.Types.ObjectID, ref: 'Consumer' },
  username: { type: String },
  quizId: { type: mongoose.Schema.Types.ObjectID, ref: 'Quiz' },
  score: { type: Number },
  time: {
    minutes: { type: Number },
    seconds: { type: Number },
  },
});
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
