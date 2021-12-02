import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import useApiCall from '../../hooks/useApiCall';
import { Tab, Tabs, Box, Avatar, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ConsumerProfileForm from '../../components/Form/ConsumerProfileForm';
import ConsumerMyBadges from '../../components/Form/ConsumerMyBadges'

const useStyles = makeStyles({
    container: {
        // padding: '20px',
        paddingTop: '30px',
        paddingBottom: '20px',
    },
    name: {
        fontWeight: 'bold',
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function ConsumerPage() {
    const { user, dispatch } = useContext(UserContext);
    const classes = useStyles();
    
    // states
    const [value, setValue] = useState(0);
    
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    return (
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
            <Box container sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                        centered 
                        value={value} 
                        onChange={handleChangeTab} 
                        aria-label="tabs"
                    >
                        <Tab label="Edit profile" {...a11yProps(0)} />
                        <Tab label="My quizzes" {...a11yProps(1)} />
                        <Tab label="My badges" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ConsumerProfileForm />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Quizzes
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ConsumerMyBadges/>
                </TabPanel>
            </Box>
        </div>
    );
}

// export default ConsumerPage;