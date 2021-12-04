// TODO: decide if we allow consumers to browse other consumers
import useApiCall from '../../hooks/useApiCall';
import BrowseUserCard from '../Card/BrowseUserCard';
import { Grid } from '@mui/material';

export default function Users() {
  const [loading, payload, error] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/consumer`
      : `http://localhost:4000/api/consumer`
  );
  if (!payload) {
    return <div>No Data</div>;
  }
  if (loading) {
    return <div>loading...</div>;
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
  }

  const consumerData = payload.createConsumer;
  consumerData.sort((a, b) => {
    return compareObjects(a.consumerUsername, b.consumerUsername);
  });
  console.log(consumerData);
  const ConsumerList = consumerData
    .map((data) => {
      return (
        <Grid item>
          {' '}
          <BrowseUserCard consumerData={data} />{' '}
        </Grid>
      );
    });
  return (
    <div>
      <Grid container spacing={3} justifyContent='center'>
        {ConsumerList}
      </Grid>
    </div>
  );
}
