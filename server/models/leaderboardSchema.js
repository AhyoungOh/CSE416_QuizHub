import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  score: { type: Number },
  time: {
    minutes: { type: Number },
    seconds: { type: Number },
  },
  isPrivate: { type: Boolean },
  timestamps: {
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
});
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
