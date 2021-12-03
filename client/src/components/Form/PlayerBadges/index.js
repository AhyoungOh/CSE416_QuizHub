import axios from 'axios';
import { useState, useEffect} from 'react';
import { Grid } from '@mui/material';

export default function PlayerBadges({badges}) {
  const [badgeArr, setBadgeArr] = useState([]);

  const getBadgeId = async () => {
    for (const badge of badges) {
      getBadge(badge.badgeId);
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
          console.log(response);
          setBadgeArr(arr=>[...arr, response.data.badge]);
          console.log(response.data.badge);
      })
    } catch (e) {
      console.error(e);
    }
  };
  
  useEffect(() => {
    getBadgeId();
  }, []);

  const BadgeComponents = badgeArr.map((badge, index) => {
    return(
      <Grid item>
          <img src={badge.badgeUploadFile} width="200" height="200"></img>
      </Grid>
    )
  });

  return(
    <div>
      <Grid container justifyContent='center' spacing={2} sx={{ paddingLeft: '20px', paddingRight: '20px'}}>
        {BadgeComponents}
      </Grid>
    </div>
  );
}