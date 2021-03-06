import Dropdown from '@restart/ui/esm/Dropdown';
import { useRef, useState } from 'react';
import { TextField, InputLabel, InputBase, Button, Grid, Select, MenuItem, FormControl, Paper, Box } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  inputPaper: {
    borderRadius: '5px',
    // minWidth: '300px',
    width: '100%',
    height: '56px',
  },
  selectorPaper: {
    borderRadius: '5px',
    width: '',
    height: '56px',
  },
  button: {
    borderRadius: '5px',
    // width: '56px',
    height: '56px',
  },
  selector: {
    height: '56px',
    fontSize: '18px',
  },
  inputBase: {
    height: '56px',
    minWidth: '80%',
    paddingLeft: '20px',
    fontSize: '18px',
  }
});

export default function SearchBar({ setSearchWord, setSearchType }) {
  const searchWordRef = useRef(null);
  const [selectedSearchType, setSelectedSearchType] = useState(null);
  const classes = useStyles();

  const onBtnClick = () => {
    setSearchWord(searchWordRef.current.value);
    setSearchType(selectedSearchType);
  };

  const handleChange = (event) => {
    setSelectedSearchType(event.target.value);
  }

  return (
    <div>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item justifyContent="center" alignItems="center">
            <Paper elevation={3} className={classes.inputPaper}>
              <Box>
                <InputBase 
                  type="text"
                  inputRef={searchWordRef}
                  placeholder="Search..."
                  className={classes.inputBase}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper  elevation={3} className={classes.selectorPaper}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Search by</InputLabel>
                <Select
                  value={selectedSearchType}
                  onChange={handleChange}
                  label="Search by"
                  className={classes.selector}
                >
                  <MenuItem value="Quiz">Quiz</MenuItem>
                  <MenuItem value="Platform">Platform</MenuItem>
                  <MenuItem value="Username">Username</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item>
            <FormControl variant="standard">
              <Button onClick={onBtnClick} variant="contained" size="large" className={classes.button}>
                <SearchRoundedIcon />
              </Button>
            </FormControl>
          </Grid>
        </Grid>
    </div>
  );
}
