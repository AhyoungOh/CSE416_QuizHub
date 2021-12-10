import WriteQuiz from '../../components/WriteQuiz';
import DetailQuiz from '../../components/DetailQuiz';
import Quiz from '../../components/Quiz';
import PlatformSpecificQuizCard from '../../components/Card/PlatformSpecificQuizCard';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './style.scss';
import { useState } from 'react';
import useApiCall from '../../hooks/useApiCall';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingTop: '20px',
  },
});

function CreatorQuiz() {
  const history = useHistory();
  const location = useLocation();
  const [loading, testData, error, fetchData] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/quiz`
      : `http://localhost:4000/api/quiz`
  );
  const [visible, setQuizVisible] = useState(false);
  const classes = useStyles();

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
  const selectedquizData = testData.createQuiz.find((el) => {
    return el._id === location.pathname.split('/')[3];
  });
  return (
    <div>
      <Switch>
        <Route exact path={`/quiz/${id}`}>
          <WriteQuiz
            quizData={selectedquizData}
            // setData={() => {}}
            setQuizVisible={setQuizVisible}
            platformId={id}
            fetchData={fetchData}
          />
        </Route>
        <Route exact path={`/quiz/detail/:id`}>
          <DetailQuiz
            quizData={selectedquizData}
            // setTestData={() => {}}
            setQuizVisible={setQuizVisible}
          />
          {visible ? (
            <WriteQuiz
              quizData={selectedquizData}
              // setData={() => {}}
              setQuizVisible={setQuizVisible}
              platformId={selectedquizData.platformId}
              fetchData={fetchData}
            />
          ) : null}
        </Route>
      </Switch>
    </div>
  );
}

export default CreatorQuiz;
