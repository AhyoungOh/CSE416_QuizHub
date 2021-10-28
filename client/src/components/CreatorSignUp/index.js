import './style.scss';
// import Sider from '../Sider';
import { useRef, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';

function CreatorSignUp() {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const emailRef = useRef('');
  // const creatorGroupRef = useRef('');
  // const userGroupRef = useRef('');
  const idRef = useRef('');
  const [errorMsg, setErrorMsg] = useState(null);

  const clickBtnHandler = async () => {
    try {
      const creatorInfo = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/creatorAuth`,
        // `http://localhost:4000/api/auth`,
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          email: emailRef.current.value,
          // creatorGroup: creatorGroupRef.current.value,
          // userGroup: userGroupRef.current.value,
          // creatorGroup: true,
          // userGroup: false,
          // id: idRef.current.value,
        }
      );
      // dispatch({ type: 'signup', payload: consumerInfo.data.user });

      setErrorMsg(null);
      history.push('/');
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
            <h1 class='mb-0 font-weight-bold text-center'>Create account</h1>
            <p class='mb-6 text-center text-muted'>
              You will be making platforms and quizzes
            </p>

            {/* <form class="mb-6"> */}
            <div class='name'>
              <label for='username'>Username</label>
              <input
                type='Name'
                class='form-control'
                id='username'
                placeholder='e.g. mark_lee1'
                ref={usernameRef}
              />
            </div>
            <p></p>

            <div class='form-group'>
              <label for='email'>Email Address</label>
              <input
                type='email'
                class='form-control'
                id='email'
                placeholder='name@address.com'
                ref={emailRef}
              />
            </div>
            <p></p>
            <div class='form-group mb-5'>
              <label for='password'>Password</label>
              <input
                type='password'
                class='form-control'
                id='password'
                placeholder='Enter your password'
                ref={passwordRef}
              />
            </div>

            {/* <!-- Submit --> */}
            <button
              class='btn btn-block btn-secondary'
              type='button'
              onClick={clickBtnHandler}
            >
              Sign up
            </button>
            {/* </form> */}

            {/* <!-- Text --> */}
            <p class='mb-0 font-size-sm text-center text-muted'>
              Already have an account? <a href='signin.html'>Log in</a>.
            </p>
          </div>
        </div>
      </div>
      {/* <Sider /> */}
    </section>
  );
}

export default CreatorSignUp;
