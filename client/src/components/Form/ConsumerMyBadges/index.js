import axios from 'axios';
import { useContext, useState ,useRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import { Card, Grid, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function ConsumerMyBadges() {
  
  const [badge_arr, setBadgeArr] = useState([]);
  
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
          setBadgeArr(arr=>[...arr,response.data.badge])
          console.log(response.data.badge.badgeVisibility)
      })
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getBadgeId();
  }, []);

  const setIsPrivate=async (value,index,e)=> {
    console.log(value._id)
    try {
      await axios.put(
        process.env.NODE_ENV == 'production'
          ? `/api/badge/${value._id}`
          : `http://localhost:4000/api/badge/${value._id}`,
          {
            badgeVisibility: value.badgeVisibility==true ? false : true,
          }
      ).then((response)=>{
          console.log(response)
          console.log(response.data.Badge.badgeVisibility)
          let new_arr=[...badge_arr]
          new_arr[index]=response.data.Badge
          setBadgeArr(new_arr)
      })
    } catch (e) {
      console.error(e);
    }
  }
  
  return (
    <div>
      <Grid container justifyContent='center' spacing={2} sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
        {badge_arr.map((value,index) => (
          <Grid item>
            <Card>
              <Grid container direction='column' alignItems='center'>
                <Grid item>
                  <img src={value.badgeUploadFile} width="200" height="200"></img>
                </Grid>
                <Grid item>
                  <IconButton onClick={(e) => setIsPrivate(value,index,e)}>
                    { value.badgeVisibility ? 
                      <Visibility sx={{ fontSize: 20 }} />
                      :
                      <VisibilityOff sx={{ fontSize: 20 }} />
                    }
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ConsumerMyBadges;
