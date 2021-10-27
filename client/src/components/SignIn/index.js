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

  const clickBtnHandler = async () => {
    try {
      const userInfo = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/auth/login`,
        {
          id: idRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: 'signin', payload: userInfo.data.user });
      setErrorMsg(null);
      history.push('/');
    } catch (e) {
      setErrorMsg(JSON.stringify(e));
      console.error(e);
    }
  };
  return (
    <div className='login-page'>
      <form>
        <div class='mb-3'>
          <label for='exampleInputEmail1' class='form-label'>
            Email address
          </label>
          <input
            type='email'
            class='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            ref={idRef}
          />
          <div id='emailHelp' class='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class='mb-3'>
          <label for='exampleInputPassword1' class='form-label'>
            Password
          </label>
          <input
            type='password'
            class='form-control'
            id='exampleInputPassword1'
            ref={passwordRef}
          />
        </div>
        <button type='button' class='btn btn-primary' onClick={clickBtnHandler}>
          Sign in
        </button>
      </form>
      {/* <Sider /> */}
    </div>
  );
}

export default SignIn;
