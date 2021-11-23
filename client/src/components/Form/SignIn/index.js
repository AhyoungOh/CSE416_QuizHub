import './style.scss';
import { useRef, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../../App';
import { useHistory } from 'react-router-dom';
// import Sider from '../Sider';
import { Paper, InputBase, Typography, Button, TextField, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  title: {
    paddingLeft: '10px',
    // paddingBottom: '10px', 
    fontSize: '32px',
    fontWeight: 'bold',  
  },
  container: {
    // padding: '30px',
    position: 'fixed',
    top: '30%',
  },
  paper: {
    minHeight: '400px',
    borderRadius: '19px',
  },
  inputField: {
    marginLeft: '16px',
    marginTop: '18px',
    height: '24px', 
    fontSize: '22px',
  },
  inputBox: {
    borderRadius: '8px',
    height: '58px',
    boxShadow: '0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)',
  },
  button: {
    height: '55px',
    fontSize: '20px',
    borderRadius: '9px',
  },
  buttonGrid: {
    marginTop: '10px', 
    marginLeft: '10px', 
    marginRight: '10px',
  },
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
      console.error(e);
    }
  };

  return (
    <div>
      {/* <section class='section-border border-primary'>
      <div class='container d-flex flex-column'>
        <div class='row align-items-center justify-content-center no-gutters min-vh-100'>
          <div class='col-12 col-md-5 col-lg-4 py-8 py-md-11'>
            <div class='card text-center'>
              <div class='card-header'>
                <h1 class='mb-0 font-weight-bold text-start'>Login</h1>
              </div>
              <div class='card-body'>
                <div class='name text-start'>
                  <label for='exampleInputEmail1'>Username</label>
                  <input
                    type='email'
                    class='form-control'
                    id='exampleInputEmail1'
                    placeholder='e.g. mark_lee1'
                    ref={idRef}
                  />
                  <div id='emailHelp' class='form-text'>
                    We'll never share your user info with anyone else.
                  </div>
                </div>
                <p></p>

                <div class='form-group mb-5 text-start'>
                  <label for='password'>Password</label>
                  <input
                    type='password'
                    class='form-control'
                    id='password'
                    placeholder='Enter your password'
                    ref={passwordRef}
                  />
                </div>

                <div>
                  <button
                    class='btn btn-block btn-primary'
                    type='button'
                    onClick={clickBtnHandler}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> */}
    {/* TODO: fix the position */}
      <Grid container justifyContent="center" className={classes.container}>
        <Grid item xs={10} s={8} md={6} lg={4}>
          <Paper className={classes.paper}>
            <Grid container direction="column" spacing={3} sx={{ padding: "20px" }}>
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
                    fullWidth
                    placeholder="Password"
                    inputRef={passwordRef}
                    type="text"
                    // inputProps={{ 'aria-label': 'search google maps' }}
                    className={classes.inputField}
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
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid> 
      </Grid>
    </div>
  );
}

export default SignIn;
