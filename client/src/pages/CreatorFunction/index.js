import PlatformPreviewCard from '../../components/Card/platformPreviewCard';
import Write from '../../components/Write';
import Detail from '../../components/Detail';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import useApiCall from '../../hooks/useApiCall';
import { Grid, Dialog, Box, Fab, DialogTitle, DialogContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingTop: '40px',
  },
  cardStyle: {
    borderRadius: '18px',
  },
  fabStyle: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    padding: '10px',
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
        {/* Creator homepage + add new platform */}
        <Route exact path='/creatorHome'>
          <Grid
            container
            spacing={2}
            justify='center'
            className={classes.gridContainer}
          >
            {PlatformComponents}
          </Grid>
          <Fab 
            color="primary" 
            aria-label="add" 
            onClick={() => setPlatformVisible((state) => !state)} 
            className={classes.fabStyle}>
            <AddRoundedIcon />
          </Fab>
          <Dialog
            keepMounted 
            open={platformvisible}
            onClose={() => setPlatformVisible(false)}
            // sx={{ borderRadius: "18px" }}
          >
            <DialogTitle>Add a new platform</DialogTitle>
            <Write
              platformData={selectedplatformData}
              setData={() => {}}
              setVisible={setPlatformVisible}
              fetchData={fetchData}
            />
          </Dialog>
        </Route>

        {/* Platform page + edit platform */}
        <Route path={`/creatorHome/:id`}>
          <Detail
            platformData={selectedplatformData}
            setTestData={() => {}}
            setVisible={setPlatformVisible}
          />
          <Dialog
            keepMounted 
            open={platformvisible}
            onClose={() => setPlatformVisible(false)}
            // sx={{ borderRadius: "18px" }}
          >
            <DialogTitle>Edit platform</DialogTitle>
            <Write
              platformData={selectedplatformData}
              setData={() => {}}
              setVisible={setPlatformVisible}
              fetchData={fetchData}
            />
          </Dialog>
        </Route>
      </Switch>
    </div>
  );
}

export default CreatorFunction;
