import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Tabs, Tab, Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import PlatformsResult from './SearchResult/PlatformsResult';
import QuizzesResult from './SearchResult/QuizzesResult';
import UsersResult from './SearchResult/UsersResult';
import Platforms from './Platforms';
import Quizzes from './Quizzes';
import Users from './Users';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const refresh = () => {
    window.location.reload(false);
  }

  return (
    <div>
      <Grid container direction='column' spacing={2} sx={{ paddingTop: '100px' }}>
        <Grid item>
          <Grid container spacing={2} justifyContent='center'>
            <Button 
              // onClick={() => {
              //   history.replace('/consumerhome');
              // }}
              onClick={refresh}
            >
              All
            </Button>
            <SearchBar
              setSearchWord={setSearchWord}
              setSearchType={setSearchType}
            />
          </Grid>
        </Grid>
        { searchWord ?
          <Grid item sx={{ marginTop: '20px' }}>
            <QuizzesResult searchWord={searchWord} searchType={searchType} />
            <PlatformsResult searchWord={searchWord} searchType={searchType} />
            <UsersResult searchWord={searchWord} searchType={searchType} />
          </Grid>
          :
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='consumer browse tab'
                  centered
                >
                  <Tab label='Quiz' {...a11yProps(0)} />
                  <Tab label='Platform' {...a11yProps(1)} />
                  <Tab label='Users' {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Quizzes />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Platforms />
              </TabPanel>
              <TabPanel value={value} index={2}>
                {/* TODO: decide if we allow consumers to browse other consumers */}
                <Users />
              </TabPanel>
            </Box>
          </Grid>
        }
      </Grid>
    </div>
  );
}
export default ConsumerHome;
