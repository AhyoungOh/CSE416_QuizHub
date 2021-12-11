import ConsumerSignUp from '../../components/Form/ConsumerSignUp';
import { Grid } from '@mui/material';

function ConsumerSignUpPage() {
  return (
    <>
      <Grid container justifyContent='center' sx={{ paddingTop: '100px' }}>
        <ConsumerSignUp />
      </Grid>
    </>
  );
}
export default ConsumerSignUpPage;
