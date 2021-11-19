import axios from 'axios';
import React, { useState } from 'react';
import Input from './Input';
import './style.scss';
import { useHistory } from 'react-router-dom';

function WriteQuestion({
  questionData,
  setQuestionVisible,
  quizId,
  fetchData,
}) {
  const [questionNumber, setQuestionNumber] = useState(
    questionData?.questionNumber || ''
  );
  const [questionQuestion, setQuestionQuestion] = useState(
    questionData?.questionQuestion || ''
  );
  const [questionOptions, setQuestionOption] = useState(
    questionData?.questionOptions || ''
  );
  const [questionAnswer, setQuetsionAnswer] = useState(
    questionData?.questionAnswer || ''
  );
  const history = useHistory();
  console.log('quizId', quizId);
  const createquestionData = async () => {
    await axios.post(
      process.env.NODE_ENV === 'production'
        ? `/api/question/${quizId}`
        : `http://localhost:4000/api/question/${quizId}`,
      {
        questionNumber,
        questionQuestion,
        questionOptions,
        questionAnswer,
        quizId,
      }
    );
    setQuestionVisible(false);
    fetchData();
    history.push(`/quiz/detail/${quizId}`);
  };

  const updatequestionData = async () => {
    await axios.put(
      process.env.NODE_ENV === 'production'
        ? `/api/question/detail/${questionData._id}`
        : `http://localhost:4000/api/question/detail/${questionData._id}`,
      {
        _id: questionData._id,
        questionNumber,
        questionQuestion,
        questionOptions,
        questionAnswer,
      }
    );
    setQuestionVisible(false);
    fetchData();
    history.push(`/question/detail/${questionData._id}`);
  };

  const deletequestionData = async () => {
    await axios.delete(
      process.env.NODE_ENV === 'production'
        ? `/api/question/detail/${questionData._id}`
        : `http://localhost:4000/api/question/detail/${questionData._id}`
    );
    setQuestionVisible(false);
    fetchData();
    history.push(`/quiz/detail/${quizId}`);
  };
  if (questionData === undefined) {
    return (
      <div className='write'>
        <div className='inputs-wrapper'>
          <Input
            title={'question number'}
            value={questionNumber}
            setValue={setQuestionNumber}
          />
          <Input
            title={'question'}
            value={questionQuestion}
            setValue={setQuestionQuestion}
          />
          <Input
            title={'question option'}
            value={questionOptions}
            setValue={setQuestionOption}
          />
          <Input
            title={'question answer'}
            value={questionAnswer}
            setValue={setQuetsionAnswer}
          />
          <div className='button-wrapper'>
            <button className='green' onClick={createquestionData}>
              Create
            </button>
            <button
              className='red'
              onClick={() => {
                setQuestionVisible(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    // edit part
    return (
      <div
        className='write'
        onClick={(e) => {
          if ([...e.target?.classList].includes('write'))
            setQuestionVisible(false);
        }}
      >
        <div className='inputs-wrapper'>
          <Input
            title={'question number'}
            value={questionNumber}
            setValue={setQuestionNumber}
          />
          <Input
            title={'question'}
            value={questionQuestion}
            setValue={setQuestionQuestion}
          />
          <Input
            title={'question option'}
            value={questionOptions}
            setValue={setQuestionOption}
          />
          <Input
            title={'question answer'}
            value={questionAnswer}
            setValue={setQuetsionAnswer}
          />
          <div className='button-wrapper'>
            <button className='green' onClick={updatequestionData}>
              Update
            </button>
            <button className='red' onClick={deletequestionData}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default WriteQuestion;
