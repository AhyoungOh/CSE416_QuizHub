import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectID, ref: 'Consumer' },
  username: { type: String },
  score: { type: Number },
  time: {
    minutes: { type: Number },
    seconds: { type: Number },
  },
  quizId: { type: mongoose.Schema.Types.ObjectID, ref: 'Quiz' },
});
const Player = mongoose.model('Player', playerSchema);

export default Player;