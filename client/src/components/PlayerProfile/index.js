import useApiCall from '../../hooks/useApiCall';
import { Avatar, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import PlayerBadges from '../Form/PlayerBadges';

const useStyles = makeStyles({
    container: {
      // padding: '20px',
      paddingTop: '90px',
      paddingBottom: '20px',
    },
    name: {
      fontWeight: 'bold',
    },
});

export default function PlayerProfile() {
    const location = useLocation();
    const classes = useStyles();

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
    const id = location.pathname.split('/')[2];
    const consumerData = payload.createConsumer.find((el) => {
        return el._id === id;
    });
    // console.log("consumerData.badges", consumerData.badges);
    
    return(
        <div>
            <Grid
                container
                spacing={2}
                direction='column'
                alignItems='center'
                className={classes.container}
            >
                <Grid item alignSelf='center' justifySelf='center'>
                    <Avatar
                        src={consumerData.consumerImage}
                        style={{
                        width: '100px',
                        height: '100px',
                        }}
                        alt={consumerData.consumerUsername}
                    />
                </Grid>
                <Grid item alignSelf='center' justifySelf='center'>
                    <Typography variant='h5' color='primary' className={classes.name}>
                        {consumerData.consumerUsername}
                    </Typography>
                </Grid>
                <Grid item alignSelf='center' justifySelf='center'>
                    <Typography variant='subtitle1' color='inherit'>
                        {consumerData.consumerDescription}
                    </Typography>
                </Grid>
            </Grid>
            <PlayerBadges badges={consumerData.badges} />
        </div>
    );
}