import './style.scss';
import { useContext } from 'react';
import { useHistory, Link} from 'react-router-dom';
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

  const id = user?.id !== '' ? user.id : '';
 

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
      <button type="button" class="btn btn-primary"
      onClick={() => {
        history.push('/auth/signin');
      }}>Consumer Login</button>
      </div>
      <div className='signup'>
      <button type="button" class="btn btn-outline-primary"
      onClick={() => {
        history.push('/auth/creator_login');
      }}>Creator Login</button>
      </div>
      
    </div>
  );
}

export default Header;
