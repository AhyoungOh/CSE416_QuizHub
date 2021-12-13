import useApiCall from '../../hooks/useApiCall';
import { Avatar, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import PlayerBadges from '../Form/PlayerBadges';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';

const useStyles = makeStyles({
    container: {
      // padding: '20px',
      paddingTop: '90px',
      paddingBottom: '20px',
      paddingLeft: '40px',
      paddingRight: '40px',
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
                        width: '120px',
                        height: '120px',
                        }}
                        alt={consumerData.consumerUsername}
                    />
                </Grid>
                <Grid item alignSelf='center' justifySelf='center'>
                    <Typography variant='h4' color='primary' className={classes.name}>
                        {consumerData.consumerUsername}
                    </Typography>
                </Grid>
                <Grid item alignSelf='center' justifySelf='center'>
                    <Typography variant='subtitle1' color='inherit' sx={{ textAlign: 'center' }}>
                        {consumerData.consumerDescription ? consumerData.consumerDescription : `Hi, this is ${consumerData.consumerUsername}!`}
                    </Typography>
                </Grid>
            </Grid>
            { consumerData.badges.length !== 0 ? 
                <PlayerBadges badges={consumerData.badges} /> 
                :
                <Grid container justifyContent='center' alignItems='center' sx={{ paddingTop: '30px', paddingLeft: '20px', paddingRight: '20px' }}>
                    <Grid item>
                        <Typography sx={{ fontFamily: 'Nunito', textAlign: 'center'}}>Still exploring...</Typography>
                    </Grid>
                    <Grid item>
                        <TravelExploreRoundedIcon />
                    </Grid>
                </Grid> 
            }
        </div>
    );
}