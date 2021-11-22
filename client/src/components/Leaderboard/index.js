import { useContext, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import axios from 'axios';
import useApiCall from '../../hooks/useApiCall';
function Leaderboard() {
  const { quizId } = useParams();
  // console.log(quizid);
  const [loading, leaderboard, error] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/quiz/leaderboard/${quizId}`
      : `http://localhost:4000/api/quiz/leaderboard/${quizId}`,
    { withCredentials: true }
  );
  if (!leaderboard) {
    return <div>No Data</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error...</div>;
  }
  return <div className='Leaderboard'>{JSON.stringify(leaderboard)}</div>;
}

export default Leaderboard;
