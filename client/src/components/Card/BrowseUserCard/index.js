import { Card, CardActionArea, Grid, Avatar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  title: {
    fontFamily: "Nunito",
    fontSize: '22px',
    marginRight: '17px',
  },
  card: {
    minWidth: '311px',
    height: '114px',
    borderRadius: '19px',
  },
});

export default function BrowseUserCard({ consumerData }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea
          onClick={() => {
            history.push(`/playerprofile/${consumerData._id}`)
          }}
          className={classes.card}
        >
          <Grid container spacing={2} alignItems='center'>
            {/* TODO: adjust the position on the card */}
            <Grid item>
              <Avatar
                src={consumerData.consumerImage}
                style={{
                  width: '70px',
                  height: '70px',
                  marginLeft: '17px',
                }}
                alt={consumerData.consumerUsername}
              />
            </Grid>
            <Grid item>
              {/* fontFamily: 'DM Serif Display' */}
              <Typography className={classes.title}>
                {consumerData.consumerUsername}
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </div>
  );
}
