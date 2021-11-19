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
        <Card sx={{ borderRadius: '18px' }}>
            {/* TODO: fix the size and ratio */}
            <CardHeader
                title={
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
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
            />
            <CardContent>
                {/* TODO: styling for list items */}
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
                {/* TODO: solve the alignment problem */}
                <Grid container sx={{ alignItems: 'center'}}>
                    <Grid item sx={{ minWidth: "90%" }} />
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