import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import { Box, Avatar, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CreatorProfileForm from '../../components/Form/CreatorProfileForm';

const useStyles = makeStyles({
    container: {
        // padding: '20px',
        paddingTop: '30px',
        paddingBottom: '30px',
    },
    name: {
        fontWeight: 'bold',
    },
});

function CreatorPage() {
    const { user, dispatch } = useContext(UserContext);
    const classes = useStyles();

    // states
    const [email, setEmail] = useState(user.email ? user.email : '');

    return(
        <div>
            <Grid 
                container
                spacing={2}
                direction="column"
                alignItems="center"
                className={classes.container}
            >
                <Grid item alignSelf="center" justifySelf="center">
                    <Avatar 
                        src={user.img} 
                        style={{
                            width: "100px",
                            height: "100px",
                        }} 
                        alt={user.username}
                    />
                    {/* TODO: add change profile pic button */}
                </Grid>
                <Grid item alignSelf="center" justifySelf="center">
                    <Typography variant="h5" color="primary" className={classes.name}>
                        {user.username}
                    </Typography>
                </Grid>
            </Grid>
            <CreatorProfileForm />
        </div>
    );
}

export default CreatorPage;