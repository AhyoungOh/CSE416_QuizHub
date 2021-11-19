import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  consumerId: { type: mongoose.Schema.Types.ObjectID, ref: 'Consumer' },
  quizId: { type: mongoose.Schema.Types.ObjectID, ref: 'Quiz' },
  score: { type: Number },
  time: {
    minutes: { type: Number },
    seconds: { type: Number },
  },
});
const Player = mongoose.model('Player', playerSchema);

export default Player;
