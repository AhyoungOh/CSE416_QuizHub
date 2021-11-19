import { Card, CardActionArea, Grid, Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    title: {
    //   fontFamily: "DM Serif Display",
      fontSize: "20px",
      fontWeight: "bolder",
    },
    card: {
      width: "200px",
      height: "60px"
    }
  });

export default function BrowsePlatformCard({ platformData }) {
    const classes = useStyles();

    return(
        <div>
            <Card>
                <CardActionArea>
                    <Grid container spacing={2}>
                        {/* TODO: adjust the position on the card */}
                        <Grid item>
                            <Avatar 
                                src={platformData.platformImage} 
                                style={{
                                    width: "40px",
                                    height: "40px",
                                }} 
                                alt={platformData.platformName}
                            />
                        </Grid>
                        <Grid item>
                            <Typography className={classes.title}>
                                {platformData.platformName}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </div>
    );
}