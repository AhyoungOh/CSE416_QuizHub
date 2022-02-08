import ConsumerSignUp from '../../components/Form/ConsumerSignUp';
import Hero from '../../components/Hero';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import { Grid, CssBaseline, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import rocket from './rocket_bg.jpeg';

const useStyles = makeStyles({
    root: {
        minHeight: '150vh',
        backgroundImage: `url(${rocket})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    title: {
        fontSize: '32px',
        fontFamily: 'Nunito',
        color: '#fff',
        paddingLeft: '40px',
        paddingRight: '40px',
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
        // <div className={classes.root}>
        <div>
            <CssBaseline />
            <Hero />
            <div id='signup'>
                <Grid container alignItems='center' justifyContent='center' sx={{ paddingTop: '100px', paddingBottom: '30px' }}>
                    <Grid item container justifyContent='center'>
                        <ConsumerSignUp />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default HomePage;