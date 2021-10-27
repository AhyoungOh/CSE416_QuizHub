import './style.scss';
import { Link } from 'react-router-dom';
// import Sider from '../Sider';

function Navigation() {
  return (
    <div className='div'>
      <Link to='/auth/signup'>
        <button className='button'>Sign Up</button>
      </Link>
      <Link to='/auth/signin'>
        <button className='button'>Sign In</button>
      </Link>
      {/* <Link to='/list'>
        <button className='button'>Go to List</button>
      </Link> */}
      <Link to='/creator_login'>
        <button className='button'>Upload Slang Dictionary</button>
      </Link>
      {/* <Link to='/checkup'>
        <button className='button'>Checkup</button>
      </Link> */}
      {/* <Sider /> */}
    </div>
  );
}

export default Navigation;
