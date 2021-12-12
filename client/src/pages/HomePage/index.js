import ConsumerSignUp from '../../components/Form/ConsumerSignUp';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import { Grid, CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';
import rocket from './rocket_bg.jpeg';

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${rocket})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
});

function HomePage(){
    const classes = useStyles();
    const { user, dispatch } = useContext(UserContext);
    const history = useHistory();

    const direct = () => {
        if (user.isCreator === false) {
            history.push('/consumerHome');
          } else if (user.isCreator === true) {
            history.push('/creatorHome');
        }
    }
    direct();

    return(
        <div className={classes.root}>
            <CssBaseline />
            <Grid container alignItems='center' sx={{ paddingTop: '120px', paddingBottom: '30px' }}>
                <Grid item sm={6} xl={0}>
                </Grid>
                <Grid item sm={6} xl={12} container justifyContent='center'>
                    <ConsumerSignUp />
                </Grid>
            </Grid>
        </div>
    );
};

export default HomePage;