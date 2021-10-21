import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  score: { type: Number },
  minutes: { type: Number },
  seconds: { type: Number },
  isPrivate: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
