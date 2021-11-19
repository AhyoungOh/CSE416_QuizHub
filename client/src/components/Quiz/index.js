import './style.scss';

function Quiz({
  quizName,
  quizDescription,
  quizImage,
  quizQuestions,
  setquizData,
}) {
  return (
    <div className='quiz' onClick={setquizData}>
      <div className='picture'>
        <img alt={quizName} src={quizImage} />
      </div>
      <div className='contents'>
        <div className='quizname'>{quizName}</div>
        <div className='question'>It has {quizQuestions.length} questions</div>
        <div className='quizdescription'>{quizDescription}</div>
      </div>
    </div>
  );
}
export default Quiz;
