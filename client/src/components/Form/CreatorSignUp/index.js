import { useRef, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../../App';
import { useHistory } from 'react-router-dom';
import {
  Paper,
  InputBase,
  Typography,
  Button,
  TextField,
  Grid,
  Tabs,
  Tab,
} from '@mui/material';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { isEmail } from '../../../utils/validate';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  title: {
    paddingLeft: '13px',
    fontSize: '32px',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  subtitle: {
    paddingLeft: '33px',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  paper: {
    borderRadius: '19px',
    minHeight: '500px',
    minWidth: '400px',
  },
  inputField: {
    marginLeft: '16px',
    marginTop: '18px',
    height: '24px',
    fontSize: '18px',
    width: '90%',
  },
  inputBox: {
    paddingLeft: '',
    borderRadius: '8px',
    height: '58px',
    boxShadow:
      '0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)',
  },
  button: {
    height: '50px',
    fontSize: '18px',
    borderRadius: '9px',
  },
  buttonGrid: {
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  contentWrapper: {
    padding: '20px',
  },
});

function CreatorSignUp() {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState(null);
  const [value, setValue] = useState('creator');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clickBtnHandler = async () => {
    if (!isEmail(emailRef.current.value)) {
      alert('Please enter a valid email.');
      return;
    }

    if (
      !usernameRef.current.value ||
      !passwordRef.current.value ||
      !emailRef.current.value
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const creatorInfo = await axios.post(
        process.env.NODE_ENV == 'production'
          ? `/api/auth/creator`
          : `http://localhost:4000/api/auth/creator`,
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          email: emailRef.current.value,
        }
      );
      // dispatch({ type: 'signup', payload: creatorInfo.data.user });

      setErrorMsg(null);
      history.push('/auth/signin');
    } catch (e) {
      setErrorMsg(JSON.stringify(e));
      console.error(e);
    }
  };

  return (
    <div>
      {/* <Grid container justifyContent='center' className={classes.container}> */}
        <Grid item xs={10} s={8} md={6} lg={4}>
          <Paper className={classes.paper}>
            <Grid
              container
              direction='column'
              spacing={2}
              className={classes.contentWrapper}
            >
              <Grid item>
                <Typography className={classes.title}>
                  Create account
                </Typography>
              </Grid>
              <Grid item>
                <Tabs value={value}>
                  <Tab
                    value='creator'
                    label='Creator'
                    wrapped
                    sx={{ fontSize: '15px' }}
                    // href='/auth/creator_signup'
                  />
                  <Tab
                    value='consumer'
                    label='Consumer'
                    wrapped
                    sx={{ fontSize: '15px' }}
                    href='/auth/consumer_signup'
                  />
                </Tabs>
              </Grid>
              <Grid item>
                <Typography variant='subtitle2' className={classes.subtitle}>
                  You will be making platforms and quizzes
                </Typography>
              </Grid>
              <Grid item>
                <Paper className={classes.inputBox}>
                  <InputBase
                    fullWidth
                    placeholder='Username *'
                    inputRef={usernameRef}
                    type='text'
                    // inputProps={{ 'aria-label': 'search google maps' }}
                    className={classes.inputField}
                  />
                </Paper>
                {/* <TextField
                  fullWidth
                  autoFocus
                  ref={usernameRef}
                  type="text"
                  placeholder="Enter your username..."
                  label="Username"
                /> */}
              </Grid>
              <Grid item>
                <Paper className={classes.inputBox}>
                  <InputBase
                    fullWidth
                    placeholder='Email *'
                    inputRef={emailRef}
                    type='text'
                    // inputProps={{ 'aria-label': 'search google maps' }}
                    className={classes.inputField}
                  />
                </Paper>
                {/* <TextField
                  fullWidth
                  autoFocus
                  ref={emailRef}
                  type="text"
                  placeholder="Enter your email..."
                  label="Username"
                /> */}
              </Grid>
              <Grid item>
                <Paper className={classes.inputBox}>
                  <InputBase
                    // fullWidth
                    placeholder='Password *'
                    inputRef={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                    // inputProps={{ 'aria-label': 'search google maps' }}
                    className={classes.inputField}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Paper>
                {/* <TextField
                  fullWidth
                  autoFocus
                  ref={passwordRef}
                  type="text"
                  placeholder="Enter your password..."
                  label="Password"
                /> */}
              </Grid>
              <Grid item className={classes.buttonGrid}>
                <Button
                  fullWidth
                  variant='contained'
                  onClick={clickBtnHandler}
                  className={classes.button}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item container direction='row' alignItems='center' justifyContent='center'>
                <Grid item>
                  <Typography>
                    Already have an account?{' '}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button href='/auth/signin'>Log In</Button> 
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      {/* </Grid> */}
    </div>
  );
}

export default CreatorSignUp;
