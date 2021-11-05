import './style.scss';
import { Link } from 'react-router-dom';
// import Sider from '../Sider';

function MainPage() {
  return (
    <div className='div'>
      <Link to='/auth/consumer_signup'>
        <button className='button'>Consumer Sign Up</button>
      </Link>
      <Link to='/auth/creator_signup'>
        <button className='button'>Creator SignUp</button>
      </Link>
      <Link to='/auth/signin'>
        <button className='button'>Sign In</button>
      </Link>
    </div>
  );
}

export default MainPage;
