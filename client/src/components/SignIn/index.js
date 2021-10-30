import './style.scss';
import { useRef, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';
// import Sider from '../Sider';

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

  const clickBtnHandler = async (req, res) => {
    try {
      const userInfo = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/auth/login`,
        {
          username: idRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: 'signin', payload: userInfo.data });
      setErrorMsg(null);
      history.push('/home');
    } catch (e) {
      setErrorMsg(JSON.stringify(e));
      console.error(e);
    }
  };
  return (
    <section class='section-border border-primary'>
    <div class='container d-flex flex-column'>
      <div class='row align-items-center justify-content-center no-gutters min-vh-100'>
        <div class='col-12 col-md-5 col-lg-4 py-8 py-md-11'>
            <div class="card text-center">
              <div class="card-header">
              <h1 class='mb-0 font-weight-bold text-start'>Login</h1>
              </div>
              <div class="card-body">
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
              </section>
  );
}

export default SignIn;
