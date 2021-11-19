import './style.scss';
import { Link } from 'react-router-dom';

function Content({ content, quizlist, setPlatformVisible }) {
  const updatePlatformData = () => {
    setPlatformVisible(true);
  };
  const owned = [];
  for (let i = 0; i < Object.keys(quizlist).length; i++) {
    owned.push(quizlist[i].quizName + ', ');
  }
  const ownedImg = [];
  for (let i = 0; i < Object.keys(quizlist).length; i++) {
    ownedImg.push(quizlist[i].quizImg);
  }
  return (
    <div className='detail-content'>
      <div className='content-title'>Platform Description</div>
      <div className='content-text'>{content}</div>
      <div className='quizlist'>
        This Platform Has Quiz: {owned}
        <Link to='/quiz'>more</Link>
      </div>
      <div className='buttons'>
        <button onClick={updatePlatformData}>Edit Platform</button>
      </div>
    </div>
  );
}

export default Content;
