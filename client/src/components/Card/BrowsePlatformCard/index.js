import { Card, CardActionArea, Grid, Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    title: {
    //   fontFamily: "DM Serif Display",
        fontSize: "20px",
        fontWeight: "bolder",
    },
    card: {
        width: '311px',
        height: '114px',
        borderRadius: '19px',
    },
  });

export default function BrowsePlatformCard({ platformData }) {
    const classes = useStyles();
    const history = useHistory();

    return(
        <div>
            <Card className={classes.card}>
                <CardActionArea
                    onClick={() => {
                        console.log(platformData._id)
                        history.push(`/consumerplatformpreview/${platformData._id}`)
                    }}
                    className={classes.card}
                >
                    <Grid container spacing={2} alignItems="center">
                        {/* TODO: adjust the position on the card */}
                        <Grid item>
                            <Avatar 
                                src={platformData.platformImage} 
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    marginLeft: '17px',
                                }} 
                                alt={platformData.platformName}
                            />
                        </Grid>
                        <Grid item>
                            {/* fontFamily: 'DM Serif Display' */}
                            <Typography className={classes.title} sx={{ fontWeight: '400', fontSize: '30px'}}>
                                {platformData.platformName}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </div>
    );
}