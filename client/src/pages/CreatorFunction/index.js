import PlatformPreviewCard from '../../components/Card/platformPreviewCard';
import Write from '../../components/Write';
import Detail from '../../components/Detail';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './style.scss';
import { useState } from 'react';
import useApiCall from '../../hooks/useApiCall';
import { Grid, Card, CardActions, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingTop: '20px',
  },
});

function CreatorFunction() {
  const history = useHistory();
  const location = useLocation();
  const [loading, testData, error, fetchData] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/creatorHome`
      : `http://localhost:4000/api/creatorHome`,
    true
  );
  const classes = useStyles();
  const [platformvisible, setPlatformVisible] = useState(false);

  if (!testData) {
    return <></>;
  }

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <>error : {error}</>;
  }
  const PlatformComponents = testData.createPlatform.map((platformData) => {
    return (
      <Grid item xs={12} sm={6} md={4}>
        <PlatformPreviewCard
          key={platformData._id}
          platformName={platformData.platformName}
          createdDate={platformData.createdDate}
          platformImage={platformData.platformImage}
          ownedQuizzes={platformData.ownedQuizzes}
          setplatformData={() => {
            history.push(`/creatorHome/${platformData._id}`);
          }}
        />
      </Grid>
    );
  });

  const id = location.pathname.split('/')[2];
  const selectedplatformData = testData.createPlatform.find((el) => {
    return el._id === id;
  });
  return (
    <div>
      <Switch>
        <Route exact path='/creatorHome'>
          <Grid
            container
            spacing={4}
            justify='center'
            className={classes.gridContainer}
          >
            {PlatformComponents}
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardActions>
                  {/* TODO: solve the span problem */}
                  <IconButton
                    aria-label='add'
                    onClick={() => setPlatformVisible((state) => !state)}
                    // component="span"
                  >
                    <AddRoundedIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          {platformvisible ? (
            <Write
              platformData={selectedplatformData}
              setData={() => {}}
              setVisible={setPlatformVisible}
              fetchData={fetchData}
            />
          ) : null}
        </Route>
        <Route path={`/creatorHome/:id`}>
          <Detail
            platformData={selectedplatformData}
            setTestData={() => {}}
            setVisible={setPlatformVisible}
          />
          {platformvisible ? (
            <Write
              platformData={selectedplatformData}
              setData={() => {}}
              setVisible={setPlatformVisible}
              fetchData={fetchData}
            />
          ) : null}
        </Route>
      </Switch>
    </div>
  );
}

export default CreatorFunction;
