import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CreateBadge from './createBadge';

function CreateCertificate() {
  const history = useHistory();
  const { token, groupid, quizid ,rewardtype} = useParams();
  console.log(groupid);
  console.log(token);
  console.log(rewardtype)
  const design_id = useRef();
  var source = 'https://embed.certificates.design/?issuer_token=';

  useEffect(() => {
    window.addEventListener('message', function (e) {
      if (
        e.origin === 'https://embed.certificates.design' &&
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

        async function updateGroup() {
          const apicall = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token token=38040def040af70134a08e39a3db35d3',
            },
          };
          const creategroupdata = {
            group: {
              certificate_design_id: e.data.design.id,
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
        if(rewardtype==1){
          async function createBadge() {
            const apicall = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token token=38040def040af70134a08e39a3db35d3',
              },
            };
            try {
              await axios
              .post(`https://api.accredible.com/v1/designers/badge/initialize`,
            {},
            apicall)
            .then((response) => {
            console.log(response);
            history.push(
            `/createbadge/${response.data.token}/${groupid}/${quizid}`
            );
            });
            } catch (e) {
              console.error(e);
            }
          }
          createBadge()
        }
        else{
          history.push(`/quiz/detail/${quizid}`);
        }
      }
    });
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <iframe src={source.concat(token)} width='100%' height='100%' />;
    </div>
  );
}

export default CreateCertificate;
