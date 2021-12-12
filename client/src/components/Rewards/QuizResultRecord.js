import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApiCall from '../../hooks/useApiCall';
import { Grid, Link, Tooltip } from '@mui/material';

function QuizResultRecord(){
    const { id } = useParams();
    const quizId = id;
    const [loading, quizResult, error] = useApiCall(
        process.env.NODE_ENV === 'production'
        ? `/api/consumer/quizHistory/${quizId}`
        : `http://localhost:4000/api/consumer/quizHistory/${quizId}`,
        { withCredentials: true }
    );
    console.log('quizResult', quizResult);

    const [leaderboardVisible, setLeaderboardVisible] = useState('');
    const [quizName, setQuizName] = useState('');

    const getQuizInfo = async () => {
        try {
            const response = await axios.get(
            process.env.NODE_ENV == 'production'
                ? `/api/quiz/detail/${quizId}`
                : `http://localhost:4000/api/quiz/detail/${quizId}`
            );
            const userInfo = await axios.get(
            process.env.NODE_ENV === 'production'
                ? `/api/auth`
                : `http://localhost:4000/api/auth`,
            { withCredentials: true }
            );
            setLeaderboardVisible(response.data.quiz.quizEnableLeaderboard);
            console.log('leaderobard visible', leaderboardVisible);
            setQuizName(response.data.quiz.quizName);
            // badge_qualifier.current = response.data.quiz.quizBadgeQualification;
            // certificate_id.current = response.data.quiz.quizCertificate;
            // // console.log('quizResult : ', quizResult[0]);

            // setCorrect(currentQuizResult.correctedAnswerNum);
            // let questionLength =
            //     Number(response.data.quiz.quizTotalNumberOfQuestions) > 0
            //         ? Number(response.data.quiz.quizTotalNumberOfQuestions)
            //         : response.data.quiz.quizQuestions.length;
            // setQues(questionLength);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getQuizInfo();
    }, []);

    return (
        <div style={{ paddingTop: '80px'}}>
            {quizResult ? JSON.stringify(quizResult[0]) : null}
            {/* leaderboard link */}
            {leaderboardVisible ? (
                <Link href={`/leaderboard/${quizId}`}>See Leaderboard</Link>
            ) : null}
        </div>
    );
}

export default QuizResultRecord;