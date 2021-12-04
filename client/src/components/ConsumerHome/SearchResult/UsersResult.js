import useApiCall from '../../../hooks/useApiCall';
import BrowseUserCard from '../../Card/BrowseUserCard';
import { Grid, Typography } from '@mui/material';

export default function UsersResult({ searchWord, searchType }) {
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
  const consumerData = payload.createConsumer;
  // console.log(consumerData);
  const ConsumerList = consumerData
    .filter((data) => {
      if (searchWord === null) return true;

      if (searchType !== 'Username') return false;

      return data.consumerUsername
        .toUpperCase()
        .includes(searchWord.toUpperCase());
    })
    .map((data) => {
      return (
        <Grid item>
          {' '}
          <BrowseUserCard consumerData={data} />{' '}
        </Grid>
      );
    }
  );

  const countResult = consumerData.filter((data) => {
    if (searchWord === null) return true;
    if (searchType !== 'Username') return false;

    return data.consumerUsername.toUpperCase().includes(searchWord.toUpperCase());
  });

  console.log('users countResult', countResult);
  console.log('searchType', searchType);
  return (
    <div>
      { countResult.length !== 0 ?
        <div>
          <Grid container justifyContent='center' sx={{ paddingBottom: '20px' }}>
            { countResult.length == 1 ?
            <Typography>{countResult.length} user</Typography>
            :
            <Typography>{countResult.length} users</Typography>
            }
          </Grid>
          <Grid container spacing={3} justifyContent='center'>
            {ConsumerList}
          </Grid>
        </div>
      : 
        <Grid container justifyContent='center'>
          { searchType == 'Username' ? 
            <Typography>No result found</Typography>
            :
            <div></div>
          }
        </Grid>
      }
    </div>
  );
}
