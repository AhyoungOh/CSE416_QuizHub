import './style.scss';
import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../../App';
import axios from 'axios';

function Header() {
  const { user, dispatch } = useContext(UserContext);
  const history = useHistory();

  const signoutClickHandler = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_SERVER}/api/auth`);
      dispatch({ type: 'signout' });
    } catch (e) {
      console.error(e);
    }
  };
  // console.log(user);
  const id = user?.id !== '' ? user.id : '';
  const isCreator =
    user?.isCreator === undefined
      ? undefined
      : user.isCreator
      ? 'Creator'
      : 'Consumer';

  return (
    <div className='header'>
      <div
        className='headerName'
        onClick={() => {
          history.push('/');
        }}
      >
        QuizHub
      </div>
      <div className='dropdown'>
        <button
          className='btn btn-secondary dropdown-toggle'
          type='button'
          id='dropdownMenu2'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          {id === '' ? 'Menu' : id} {isCreator === '' ? '' : isCreator}
        </button>
        <ul className='dropdown-menu' aria-labelledby='dropdownMenu2'>
          {id === '' && (
            <li>
              <button
                className='dropdown-item'
                type='button'
                onClick={() => {
                  history.push('/auth/signin');
                }}
              >
                Log in
              </button>
            </li>
          )}
          {id !== '' && (
            <li>
              <button
                className='dropdown-item'
                type='button'
                onClick={signoutClickHandler}
              >
                Log Out
              </button>
            </li>
          )}
          <li>
            <button
              className='dropdown-item'
              type='button'
              onClick={() => {
                history.push('/auth/signup');
              }}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
