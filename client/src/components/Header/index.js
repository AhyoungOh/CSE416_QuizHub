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
      history.push('/');
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
        <img
        className='headerName'
        src='/logo.png'
        width='160'
        onClick={() => {
          history.push('/');
        }}
      />

      <div className='login'>
      {id === '' ? 
      <button type="button" class="btn btn-primary"
      onClick={() => {
        history.push('/auth/signin');
      }}>Login</button>     
      : 
      <div className='dropdown'>
      <button
        className='btn btn-primary dropdown-toggle'
        type='button'
        id='dropdownMenu2'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
      {id} {isCreator === '' ? '' : isCreator}
      </button>
      <ul className='dropdown-menu' aria-labelledby='dropdownMenu2'>
            <li>
              <button
                className='dropdown-item'
                type='button'
                onClick={() => {
                  history.push('/accountsettings');
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
      } 
      </div> 
      
    </div>
  );

}

export default Header;
