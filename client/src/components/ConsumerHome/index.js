import { useState } from 'react';
import { Grid, Tabs, Tab, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Platforms from './Platforms';
import Quizzes from './Quizzes';

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
          {children}
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

function ConsumerHome() {
  // search keyword
  const [searchWord, setSearchWord] = useState(null);
  // quiz or platform or username
  const [searchType, setSearchType] = useState(null);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item />
        <Grid item />
        <Grid item>
          <SearchBar setSearchWord={setSearchWord} setSearchType={setSearchType} />
        </Grid>
        <Grid item>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={value} 
                onChange={handleChange} 
                aria-label="consumer browse tab"
                centered
              >
                <Tab label="Quiz" {...a11yProps(0)} />
                <Tab label="Platform" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Quizzes searchWord={searchWord} searchType={searchType} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Platforms searchWord={searchWord} searchType={searchType} />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
export default ConsumerHome;
