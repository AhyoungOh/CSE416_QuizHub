import useApiCall from '../../hooks/useApiCall';
import BrowsePlatformCard from '../Card/BrowsePlatformCard';
import { Grid, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  loading: {
    display: 'flex',
    position: 'absolute',
    left: '50%',
    top: '50%',
  }
});

export default function Platforms() {
  const classes = useStyles();
  const [loading, payload, error] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/creatorHome`
      : `http://localhost:4000/api/creatorHome`,
    { withCredentials: true }
  );
  if (!payload) {
    return (
      <div>
        <CircularProgress color='inherit' className={classes.loading} />
      </div>
    );
  }
  if (loading) {
    return (
      <div>
        <CircularProgress color='inherit' className={classes.loading} />
      </div>
    );
  }
  if (error) {
    return <div>error...</div>;
  }

  const compareObjects = (a, b) => {
    const a_mod = a.toUpperCase();
    const b_mod = b.toUpperCase();

    if (a_mod < b_mod) {
      return -1;
    }
    if (a_mod > b_mod) {
      return 1;
    }
    return 0;
  };

  const platformData = payload.createPlatform;
  platformData.sort((a, b) => {
    return compareObjects(a.platformName, b.platformName);
  });
  const PlatformCardList = platformData.map((data) => {
    return (
      <Grid item>
        {' '}
        <BrowsePlatformCard platformData={data} />{' '}
      </Grid>
    );
  });
  return (
    <div>
      <Grid container spacing={3} justifyContent='center'>
        {PlatformCardList}
      </Grid>
    </div>
  );
}
