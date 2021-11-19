// Platform Card in Creator Homepage (CreatorFunction)
import { Card, CardHeader, CardContent, CardActions, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
// import Typography from "@mui/material/Typography";

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
        <Card>
            {/* TODO: fix the size and ratio */}
            <CardHeader
                title={platformName}
                avatar={
                    <Avatar alt={platformName} src={platformImage}/>
                }
            />
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <AlarmRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={createdDate} />
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
                {/* TODO: solve the span problem */}
                <IconButton aria-label="more" onClick={setplatformData}>
                    <ArrowForwardRoundedIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default PlatformPreviewCard;