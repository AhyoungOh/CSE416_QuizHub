import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import { Box, Avatar, Typography, Grid } from '@mui/material';
import CreatorProfileForm from '../../components/Form/CreatorProfileForm';

function CreatorPage() {
    const { user, dispatch } = useContext(UserContext);

    // states
    const [email, setEmail] = useState(user.email ? user.email : '');

    return(
        <div>
            <Grid 
                container
                spacing={2}
                direction="column"
                alignItems="center"
            >
                <Grid item />
                {/* TODO: fix the left and top padding */}
                <Grid item alignItems="center" justify="center">
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
                {/* TODO: fix the left and top padding */}
                {/* TODO: make the username in blue */}
                <Grid item alignItems="center" justify="center">
                    <Typography variant="h5">
                        <b>{user.username}</b>
                    </Typography>
                </Grid>
                <Grid item />
            </Grid>
            <CreatorProfileForm />
        </div>
    );
}

export default CreatorPage;