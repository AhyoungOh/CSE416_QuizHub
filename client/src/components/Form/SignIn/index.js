import { useRef, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../../App';
import { useHistory } from 'react-router-dom';
// import Sider from '../Sider';
import { Paper, InputBase, Typography, Button, TextField, Grid, InputAdornment, IconButton, Alert, Collapse } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const useStyles = makeStyles({
  title: {
    paddingLeft: '10px',
    // paddingBottom: '10px', 
    fontSize: '32px',
    fontFamily: 'Nunito',
  },
  container: {
    // padding: '30px',
    position: 'fixed',
    top: '25%',
  },
  paper: {
    minHeight: '400px',
    borderRadius: '19px',
  },
  inputField: {
    marginLeft: '16px',
    marginTop: '18px',
    height: '24px', 
    fontSize: '18px',
    width: '90%',
  },
  inputBox: {
    borderRadius: '8px',
    height: '58px',
    boxShadow: '0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)',
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
  alert: {
    width: '50%',
    display: 'flex',
    position: 'fixed',
    top: '20%',
  }
});

function SignIn() {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const creatorGroupRef = useRef('');
  const userGroupRef = useRef('');
  const idRef = useRef('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const classes = useStyles();

  const clickBtnHandler = async (req, res) => {
    try {
      const userInfo = await axios.post(
        process.env.NODE_ENV == 'production'
          ? `/api/auth/login`
          : `http://localhost:4000/api/auth/login`,
        {
          username: idRef.current.value,
          password: passwordRef.current.value,
        },
        {
          withCredentials: true,
        }
      );
      // dispatch({ type: 'signin', payload: userInfo.data.user });
      dispatch({ type: 'signin', payload: userInfo.data });
      setErrorMsg(null);
      if (Object.keys(userInfo.data)[0] === 'consumer') {
        history.push('/consumerHome');
      } else if (Object.keys(userInfo.data)[0] === 'creator') {
        history.push('/creatorHome');
      }
    } catch (e) {
      setErrorMsg(JSON.stringify(e));
      alert('Incorrect username or password.');
      console.error(e);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  return (
    <div>
      {/* <Grid container justifyContent="center">
        <Collapse in={showError} className={classes.alert}>
          <Alert
            severity="error"
            // variant="filled"
            onClose={() => {setShowError(false);}}
            sx={{ fontSize: '15px' }}
          >
            Incorrect username or password.
          </Alert>
        </Collapse>
      </Grid> */}
      <Grid container justifyContent="center" className={classes.container}>
        <Grid item xs={10} s={8} md={6} lg={4}>
          <Paper className={classes.paper}>
            <Grid container direction="column" spacing={3} className={classes.contentWrapper}>
              <Grid item>
                <Typography className={classes.title}>
                  Login
                </Typography>
              </Grid>
              <Grid item>
                <Paper className={classes.inputBox}>
                  <InputBase
                    fullWidth
                    placeholder="Username"
                    inputRef={idRef}
                    type="text"
                    // inputProps={{ 'aria-label': 'search google maps' }}
                    className={classes.inputField}
                  />
                </Paper>
                {/* <TextField
                  fullWidth
                  autoFocus
                  ref={idRef}
                  type="text"
                  placeholder="Enter your username..."
                  label="Username"
                /> */}
              </Grid>
              <Grid item>
                <Paper className={classes.inputBox}>
                  <InputBase
                    // fullWidth
                    placeholder="Password"
                    inputRef={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                    // inputProps={{ 'aria-label': 'search google maps' }}
                    className={classes.inputField}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff /> }
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
                  variant="contained"
                  onClick={clickBtnHandler}
                  className={classes.button}
                >
                  Log In
                </Button>
              </Grid>
              <Grid item container direction='row' alignItems='center' justifyContent='center'>
                <Grid item>
                  <Typography>Don't have an account yet?</Typography>
                </Grid>
                <Grid item>
                  <Button href='/auth/creator_signup'>Register</Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid> 
      </Grid>
    </div>
  );
}

export default SignIn;
