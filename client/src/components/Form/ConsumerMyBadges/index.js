import axios from 'axios';
import { useContext, useState ,useRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';

function ConsumerMyBadges() {
  
  const [img_arr,setImgArr]=useState([])
  
  const getBadgeId = async () => {
    try {
      const userInfo = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/api/auth`
          : `http://localhost:4000/api/auth`,
        { withCredentials: true }
      );
      console.log(userInfo.data.consumer.badges)
      for (const element of userInfo.data.consumer.badges) {
        console.log(element.badgeId);
        getBadge(element.badgeId);
    }
      
    } catch (e) {
      console.error(e);
    }
  };

  const getBadge = async (badge_id) => {
    console.log(badge_id)
    try {
      await axios.get(
        process.env.NODE_ENV == 'production'
          ? `/api/badge/${badge_id}`
          : `http://localhost:4000/api/badge/${badge_id}`,
      ).then((response)=>{
          console.log(response)
          //img_arr.current.push(response.data.badge.badgeUploadFile)
          setImgArr(arr => [...arr, response.data.badge.badgeUploadFile,])
          console.log(img_arr)
      })
      
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getBadgeId();
  }, []);

  
  return (
    <div>
     {img_arr.map((value) => (
         <img src={value} width="200" height="200"></img>
        ))}
    </div>
  );
}

export default ConsumerMyBadges;
