import './style.scss';
import { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../../App';
import axios from 'axios';

function Header() {
  const { user, dispatch } = useContext(UserContext);
  const history = useHistory();
  console.log('user', user);
  const setUserInfo = async () => {
    const userInfo = await axios.get(
      process.env.NODE_ENV === 'production'
        ? `/api/auth`
        : `http://localhost:4000/api/auth`,
      { withCredentials: true }
    );
    console.log('userInfo', userInfo);
    dispatch({ type: 'signin', payload: userInfo.data });
  };
  useEffect(() => {
    setUserInfo();
  }, []);

  const signoutClickHandler = async () => {
    try {
      // await axios.delete(`/api/auth`);
      await axios.delete(
        process.env.NODE_ENV === 'production'
          ? `/api/auth/`
          : `http://localhost:4000/api/auth`,
        { withCredentials: true } // session에 데이터를 추가해줌.
      );
      dispatch({ type: 'signout' });
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  };
  // const user = consumer ? consumer : creator;
  // console.log('consumer', consumer);
  // console.log('creator', creator);
  // console.log('user ', user);
  const id = user?.id ? user.id : '';

  console.log('id: ', id);
  const isCreator =
    user?.isCreator === undefined
      ? undefined
      : user.isCreator
      ? 'Creator'
      : 'Consumer';

  return (
    <div className='header'>
      <img
        className='headerName'
        src='/logo.png'
        width='160'
        onClick={() => {
          if (user.isCreator === false) {
            history.push('/consumerHome');
          } else if (user.isCreator === true) {
            history.push('/creatorHome');
          } else {
            history.puth('/');
          }
        }}
      />

      <div className='login'>
        {id === '' ? (
          <button
            type='button'
            class='btn btn-primary'
            onClick={() => {
              history.push('/auth/signin');
            }}
          >
            Login
          </button>
        ) : (
          <div className='dropdown'>
            <button
              className='btn btn-primary dropdown-toggle'
              type='button'
              id='dropdownMenu2'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              {user.username} {isCreator === '' ? '' : isCreator}
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenu2'>
              <li>
                <button
                  className='dropdown-item'
                  type='button'
                  onClick={() => {
                    if (isCreator == 'Creator') {
                      // history.push('/creatoraccountsettings');
                      history.push('creator-page');
                    } else {
                      history.push('/consumer-page');
                    }
                  }}
                >
                  Account Settings
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  type='button'
                  onClick={signoutClickHandler}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
