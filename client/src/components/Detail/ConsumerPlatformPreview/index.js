import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useApiCall from '../../../hooks/useApiCall';
import PlatformSpecificQuizCard from '../../Card/PlatformSpecificQuizCard';
import Platform from '../../Platform';
import { Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    gridContainer: {
      paddingLeft: '40px',
      paddingRight: '40px',
      paddingTop: '20px',
      paddingBottom: '40px',
    },
    gridContainerButtons: {
      padding: '10px',
    },
  });

function ConsumerPlatformPreview() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const owned = [];
    const [loading, testData, error, fetchData] = useApiCall(
        process.env.NODE_ENV === 'production'
          ? `/api/creatorHome`
          : `http://localhost:4000/api/creatorHome`,
        true
    );

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
    const platformData = testData.createPlatform.find((el) => {
      return el._id === id;
    });

    // platformData={selectedplatformData}
    for (let i = 0; i < Object.keys(platformData.ownedQuizzes).length; i++) {
        owned.push(platformData.ownedQuizzes[i].quizName + ', ');
    }

    const QuizComponents = platformData.ownedQuizzes.map((quizData) => {
        return (
          <PlatformSpecificQuizCard
            quizData={quizData}
            quizName={quizData.quizName}
            quizDescription={quizData.quizDescription}
            quizImage={quizData.quizImage}
            quizCreatedDate={quizData.createdDate}
            clickAction={() => {
                history.push(`/consumerquizpreview/${quizData._id}`);
            }}
          />
        );
    });

    return(
        <div>
            <Grid containter sx={{ paddingLeft: "10px", paddingTop: "80px" }}>
                <Button
                onClick={() => {
                    history.push('/consumerhome');
                }}
                // startIcon={<KeyboardBackspaceRoundedIcon />}
                sx={{ color: "gray" }}
                >
                Back to homepage
                </Button>
            </Grid>
            <Platform
                platformName={platformData.platformName}
                platformImage={platformData.platformImage}
                platformDescription={platformData.platformDescription}
            />
            <Grid container spacing={3} className={classes.gridContainer} alignItems="center">
                {QuizComponents}
            </Grid>
        </div>
    );
}

export default ConsumerPlatformPreview;