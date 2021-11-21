import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionNumber: { type: Number },
  questionQuestion: { type: String },
  questionOptions: [{ type: String }],
  questionAnswer: { type: Number },
  quizId: { type: String },
});
const Question = mongoose.model('Question', questionSchema);

export default Question;
