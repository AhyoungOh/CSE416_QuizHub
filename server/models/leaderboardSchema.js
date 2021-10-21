import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
