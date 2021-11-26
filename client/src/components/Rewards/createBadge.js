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

  useEffect(() => {
    window.addEventListener('message', function (e) {
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

        async function createBadge() {
          try {
            await axios.post(
              process.env.NODE_ENV == 'production'
                ? `/api/badge`
                : `http://localhost:4000/api/badge`,
              {
                badgeRasterizedContentUrl:e.data.design.rasterized_content_url,
                badgeEncodedContent: e.data.design.encoded_content,
                badgeUploadFile: '',
                badgeRequirementsAccuracy: 100,
              }
            );
          } catch (e) {
            console.error(e);
          }
        }
        async function updateGroup() {
          const apicall = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token token=ac4e7119623388f9afad927bb881138f',
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
        createBadge();
        updateGroup();
        history.push(`/quiz/detail/${quizid}`);
      }
    });
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <iframe src={source.concat(token)} width='100%' height='100%' />;
    </div>
  );
}

export default CreateBadge;
