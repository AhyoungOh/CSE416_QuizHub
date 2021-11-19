import Dropdown from '@restart/ui/esm/Dropdown';
import { useRef, useState } from 'react';
import { TextField, InputLabel, InputBase, Button, Grid, Select, MenuItem, FormControl, Paper, Box } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  inputPaper: {
    borderRadius: '5px',
    // width: '537px',
    minWidth: '350px',
    height: '56px',
  },
  selectorPaper: {
    borderRadius: '5px',
    width: '',
    height: '56px',
  },
  button: {
    borderRadius: '5px',
    width: '56px',
    height: '56px',
  },
  selector: {
    height: '56px',
    fontSize: '20px',
  },
  inputBase: {
    height: '56px',
    minWidth: '260px',
    paddingLeft: '20px',
    fontSize: '20px',
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

  // TODO: make it responsive, add search function to search for both (default selector), search other player by username
  return (
    <div>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item justifyContent="center" alignItems="center">
            <Paper elevation={3} className={classes.inputPaper}>
              <Box>
                {/* <TextField type="text" variant="outlined" inputRef={searchWordRef} placeholder="Search..." className={classes.textField}>
                </TextField> */}
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
                  // inputProps={{ 'aria-label': 'Without label' }}
                  className={classes.selector}
                >
                  {/* <MenuItem value="">
                    <em>All</em>
                  </MenuItem> */}
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
                {/* Search */}
              </Button>
            </FormControl>
          </Grid>
        </Grid>
    </div>
  );
}
