import './style.scss';

function Question({
  questionNumber,
  questionQuestion,
  questionAnswer,
  questionOptions,
  setquestionData,
}) {
  return (
    <div className='question' onClick={setquestionData}>
      <div className='questionnumber'>Question Number: {questionNumber}</div>
      <div className='questionOptions'>Question Option: {questionOptions}</div>
      <div className='questionAnswer'>Question Answer: {questionAnswer}</div>
      <div className='question'>Question: {questionQuestion}</div>
    </div>
  );
}

export default Question;
