import CreatorSignUp from '../../components/Form/CreatorSignUp';
import { Grid } from '@mui/material';

function CreatorSignUpPage() {
  return (
    <>
      <Grid container justifyContent='center' sx={{ paddingTop: '100px' }}>
        <CreatorSignUp />
      </Grid>
    </>
  );
}
export default CreatorSignUpPage;
