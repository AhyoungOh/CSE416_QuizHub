import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionNumber: { type: Number },
  questionQuestion: { type: String },
  questionOptions: [{ type: String }],
  questionOption1: { type: String },
  questionOption2: { type: String },
  questionOption3: { type: String },
  questionOption4: { type: String },
  questionAnswer: { type: Number },
  quizId: { type: String },
});
const Question = mongoose.model('Question', questionSchema);

export default Question;
