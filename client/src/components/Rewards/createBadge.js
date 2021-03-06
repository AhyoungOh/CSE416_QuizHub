import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function CreateBadge() {
  const history = useHistory();
  const { token, groupid,quizid} = useParams();
  console.log(groupid);
  console.log(token);
  const design_id = useRef();
  var source = 'https://embed.badge.design/?issuer_token=';

  function badge(e){
    console.log("inside event function")
    if (
      e.origin === 'https://embed.badge.design' &&
      typeof e.data === 'object'
    ) {
      console.log('Completed:', e.data.completed);
      console.log('Status:', e.data.status);
      console.log('Id:', e.data.design.id);
      console.log(
        'Rasterized Content Url:',
        e.data.design.rasterized_content_url
      );
      console.log('Encoded Content:', e.data.design.encoded_content);

      if(e.data.design.id ==null || e.data.design.rasterized_content_url==null){
        //delete group
        console.log("inside delete group")
        async function deleteGroup(){
          const apicall = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token token=b3a628c312c7f9143f432dfec31ae02d',
            },
          };
          try {
            await axios
              .delete(
                `https://api.accredible.com/v1/issuer/groups/${groupid}`,
                apicall
              )
              .then((response) => {
                console.log(response);
              });
          } catch (e) {
            console.error(e);
          }
        }
        deleteGroup()
        history.push(`/quiz/detail/${quizid}`);
      }

      async function updateGroup() {
        const apicall = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token token=b3a628c312c7f9143f432dfec31ae02d',
          },
        };
        const creategroupdata = {
          group: {
            badge_design_id: e.data.design.id,
          },
        };
        try {
          await axios
            .put(
              `https://api.accredible.com/v1/issuer/groups/${groupid}`,
              creategroupdata,
              apicall
            )
            .then((response) => {
              console.log(response);
            });
        } catch (e) {
          console.error(e);
        }
      }
      updateGroup();
      history.push(`/quiz/detail/${quizid}`);
    }
  }

  useEffect(() => {
    window.addEventListener('message',(e)=>badge(e),{once:true});
    console.log("event listener added")
    return () => {
      window.removeEventListener('message', (e)=>badge(e));
      console.log("event listener removed")
    };
  }, []);

  return (
    <div style={{ height: '100vh', paddingTop: '60px' }}>
      <iframe src={source.concat(token)} width='100%' height='100%' />;
    </div>
  );
}

export default CreateBadge;
