import './style.scss';
// import Sider from '../Sider';
import { useRef, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';

function SignUp() {
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
      const consumerInfo = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/auth`,
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
      dispatch({ type: 'signup', payload: consumerInfo.data.user });

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
        <div class='row align-items-center justify-content-end no-gutters min-vh-100'>
          <div class='col-12 col-md-5 col-lg-4 py-8 py-md-11'>
            <h1 class='mb-0 font-weight-bold text-left font-color-rgb(0, 119, 255)'>Create account</h1>
              <div class="card text-center">
                <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
                  <li class="nav-item">
                  <a class="nav-link active" data-toggle="pill" id="consumer"href="#" role="tab"  aria-selected="true">Consumer</a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link" data-toggle="pill" href="#" id="creator" role="tab" aria-selected="false">Creator</a>
                  </li>
                  </ul>
                </div>
              <div class="card-body">
                <div class="tab-pane fade show active" id="pills-home">
                  <p class='mb-6 text-start text-muted'>
                  Consumer will be taking quizzes
                  </p>
        
                  <div class='name text-start'>
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

                  <div class='form-group text-start'>
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
                  class='btn btn-block btn-secondary'
                  type='button'
                  onClick={clickBtnHandler}
                  >
                  Sign up 
                  </button>
                  </div>

          
                  <p class='mb-0 font-size-sm text-center text-muted'>
                  Already have an account? <a href='signin.html'>Log in</a>.
                  </p>
       
                  </div>
                </div>
                <div class="tab-pane fade">
                 
                </div>
             </div>
          </div>
        </div>
      </div>
      {/* <Sider /> */}
    </section>
  );
}

export default SignUp;
