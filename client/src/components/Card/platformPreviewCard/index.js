// Platform Card in Creator Homepage (CreatorFunction)
import { Card, CardHeader, CardContent, CardActions, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const useStyles = makeStyles({});

function PlatformPreviewCard({
    platformName,
    createdDate,
    platformImage,
    ownedQuizzes,
    setplatformData,
}){
    const classes = useStyles();
    return (
        <Card sx={{ borderRadius: '18px', maxWidth: '300px', minWidth: '300px' }}>
            <CardHeader
                title={
                    <Typography sx={{ fontSize: '23px', fontFamily: 'Nunito' }}>
                        {platformName}
                    </Typography>
                }
                avatar={
                    <Avatar 
                        alt={platformName} 
                        src={platformImage}
                        sx={{ width: 70, height: 70, m: 1 }}
                    />
                }
                sx={{ paddingLeft: '15px', paddingTop: '15px', paddingRight: '25px' }}
            />
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <AlarmRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={createdDate.slice(0, 10)} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <ListAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${ownedQuizzes.length}` + ' quizzes'} />
                    </ListItem>
                </List>
            </CardContent>
            <CardActions>
                <Grid container justifyContent='end'>
                    <Grid item>
                        <IconButton aria-label="more" onClick={setplatformData} sx={{ m: 1 }}>
                            <ArrowForwardRoundedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default PlatformPreviewCard;