import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionNumber: { type: Number },
    questionQuestion: { type: String },
    questionOptions: { type: [ {type: String} ] },
    questionAnswer: { type: Number },
});
const Question = mongoose.model('Question', questionSchema);

export default Question;