import WriteQuestion from '../../components/WriteQuestion';
import DetailQuestion from '../../components/DetailQuestion';
import Question from '../../components/Question';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './style.scss';
import { useState } from 'react';
import useApiCall from '../../hooks/useApiCall';

function CreatorQuestion() {
  const history = useHistory();
  const location = useLocation();
  const [loading, testData, error, fetchData] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/question`
      : `http://localhost:4000/api/question`
  );
  const [visible, setQuestionVisible] = useState(false);

  if (!testData) {
    return <></>;
  }
  if (loading) {
    return <>loading...</>;
  }
  if (error) {
    return <>error : {error}</>;
  }
  const id = location.pathname.split('/')[2];
  const selectedquestionData = testData.createQuestion.find((el) => {
    return el._id === location.pathname.split('/')[3];
  });
  return (
    <div>
      <Switch>
        <Route exact path={`/question/${id}`}>
          <WriteQuestion
            questionData={selectedquestionData}
            setData={() => {}}
            setQuestionVisible={setQuestionVisible}
            quizId={id}
            fetchData={fetchData}
          />
        </Route>
        <Route path={`/question/detail/:id`}>
          <DetailQuestion
            questiondata={selectedquestionData}
            setTestData={() => {}}
            setQuestionVisible={setQuestionVisible}
          />
          {visible ? (
            <WriteQuestion
              questionData={selectedquestionData}
              setData={() => {}}
              setQuestionVisible={setQuestionVisible}
              quizId={selectedquestionData.quizId}
              fetchData={fetchData}
            />
          ) : null}
        </Route>
      </Switch>
    </div>
  );
}

export default CreatorQuestion;
