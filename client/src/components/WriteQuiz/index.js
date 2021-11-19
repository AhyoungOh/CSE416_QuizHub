import axios from 'axios';
import React, { useState, useRef } from 'react';
import Input from './Input';
import './style.scss';
import { useHistory } from 'react-router-dom';

function WriteQuiz({ quizData, setQuizVisible, platformId, fetchData }) {
  // const [platformId, setPlatformId] = useState(quizData?.platformId || '');
  const [quizName, setQuizName] = useState(quizData?.quizName || '');
  const [quizImage, setQuizImage] = useState(quizData?.quizImage || '');
  const [createdDate, setCreatedDate] = useState(quizData?.createdDate || '');
  const [quizDescription, setQuizDescription] = useState(
    quizData?.quizDescription || ''
  );
  const [quizNumberOfTrials, setQuizNumberOfTrials] = useState(
    quizData?.quizNumberOfTrials || ''
  );
  const [quizTimeLimitMinutes, setQuizTimeLimitMinutes] = useState(
    quizData?.quizTimeLimit?.minutes || ''
  );
  const [quizTimeLimitSeconds, setQuizTimeLimitSeconds] = useState(
    quizData?.quizTimeLimit?.seconds || ''
  );
  const [quizRewardType, setQuizRewardType] = useState(
    quizData?.quizRewardType || ''
  );
  const [quizCertificate, setQuizCertificate] = useState(
    quizData?.quizCertificate || ''
  );
  const [quizBadge, setQuizBadge] = useState(quizData?.quizBadge || '');
  const [quizCertificateQualification, setQuizCertificateQualification] =
    useState(quizData?.quizCertificateQualification || '');
  const [quizBadgeQualification, setQuizBadgeQualification] = useState(
    quizData?.quizBadgeQualification || ''
  );
  const [quizEnableLeaderboard, setQuizEnableLeaderboard] = useState(
    quizData?.quizEnableLeaderboard || ''
  );

  const groupid = useRef(0);
  const history = useHistory();
  const createquizData = async () => {
    await axios.post(
      process.env.NODE_ENV === 'production'
        ? `/api/quiz/${platformId}`
        : `http://localhost:4000/api/quiz/${platformId}`,
      {
        platformId,
        quizName,
        quizImage,
        createdDate: Date.now(),
        quizNumberOfTrials,
        quizTimeLimitMinutes,
        quizTimeLimitSeconds,
        quizRewardType,
        quizCertificate,
        quizBadge,
        quizCertificateQualification,
        quizBadgeQualification,
        quizEnableLeaderboard,
        quizDescription,
      }
    );
    setQuizVisible(false);
    fetchData();
    //history.push(`/creatorHome/${platformId}`);
    createCertificate();
  };
  const updatequizData = async () => {
    await axios.put(
      process.env.NODE_ENV === 'production'
        ? `/api/quiz/detail/${quizData._id}`
        : `http://localhost:4000/api/quiz/detail/${quizData._id}`,
      {
        _id: quizData._id,
        platformId,
        quizImage,
        quizName,
        createdDate: Date.now(),
        quizNumberOfTrials,
        quizTimeLimitMinutes,
        quizTimeLimitSeconds,
        quizRewardType,
        quizCertificate,
        quizBadge,
        quizCertificateQualification,
        quizBadgeQualification,
        quizEnableLeaderboard,
        quizDescription,
      }
    );
    setQuizVisible(false);
    fetchData();
    history.push(`/quiz/detail/${quizData._id}`);
  };
  const deletequizData = async () => {
    await axios.delete(
      process.env.NODE_ENV === 'production'
        ? `/api/quiz/deatil/${quizData._id}`
        : `http://localhost:4000/api/quiz/detail/${quizData._id}`
    );
    setQuizVisible(false);
    fetchData();
    history.push(`/creatorHome/${platformId}`);
  };

  const createCertificate = async () => {
    const apicall = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token token=ac4e7119623388f9afad927bb881138f',
      },
    };
    const apidata = {};
    const creategroupdata = {
      group: {
        name: quizName,
        course_name: quizName,
        course_description: quizDescription,
        course_link: 'https://cse416-quizhub.netlify.app',
        attach_pdf: true,
        certificate_design_id: null,
        badge_design_id: null,
      },
    };
    try {
      await axios
        .post(
          `https://api.accredible.com/v1/issuer/groups`,
          creategroupdata,
          apicall
        )
        .then((response) => {
          console.log(response);
          groupid.current = response.data.group.id;
        });
      await axios
        .post(
          `https://api.accredible.com/v1/designers/certificate/initialize`,
          apidata,
          apicall
        )
        .then((response) => {
          console.log(response);
          history.push(
            `/createcertificate/${response.data.token}/${groupid.current}/${platformId}`
          );
        });
    } catch (e) {
      console.error(e);
    }
  };
  if (quizData === undefined) {
    return (
      <div className='write'>
        <div className='inputs-wrapper'>
          <Input title={'Quiz Title'} value={quizName} setValue={setQuizName} />
          <Input
            title={'Quiz Image'}
            value={quizImage}
            setValue={setQuizImage}
          />
          <Input
            title={'Quiz Desciprion'}
            value={quizDescription}
            setValue={setQuizDescription}
          />
          <Input
            title={'Number Of Trials of Quiz'}
            value={quizNumberOfTrials}
            setValue={setQuizNumberOfTrials}
          />
          <Input
            title={'Quiz Time Limit (Minutes)'}
            value={quizTimeLimitMinutes}
            setValue={setQuizTimeLimitMinutes}
          />
          <Input
            title={'Quiz Time Limit (Seconds)'}
            value={quizTimeLimitSeconds}
            setValue={setQuizTimeLimitSeconds}
          />
          {/* I commented because of the UI design all the below code is needed */}
          {/* <Input
            title={'Quiz RewardType'}
            value={quizRewardType}
            setValue={setQuizRewardType}
          />
          <Input
            title={'Quiz Certificate?'}
            value={quizCertificate}
            setValue={setQuizCertificate}
          />
          <Input
            title={'Quiz Badge?}
            value={quizBadge}
            setValue={setBadge}
          />
          <Input
            title={'Quiz Certificate Qualification'}
            value={quizCertificateQualification}
            setValue={setQuizCertificateQualification}
          />
          <Input
            title={'Quiz Badge Qualification'}
            value={quizBadgeQualification}
            setValue={setQuizBadgeQualification}
          />
          <Input
            title={'Quiz Enable Leaderboard'}
            value={quizEnableLeaderboard}
            setValue={setQuizEnableLeaderboard}
          /> */}
          {/* <div className='button-wrapper'>
          <button
              className='green'
              onClick={createCertificate}
            >Create Certificate
          </button>
          </div> */}
          <div className='button-wrapper'>
            <button className='green' onClick={createquizData}>
              Create Quiz and Navigate to Certificate Designer
            </button>
            <button
              className='red'
              onClick={() => {
                setQuizVisible(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    // edit part
    return (
      <div
        className='write'
        onClick={(e) => {
          if ([...e.target?.classList].includes('write')) setQuizVisible(false);
        }}
      >
        <div className='inputs-wrapper'>
          <Input title={'Quiz Title'} value={quizName} setValue={setQuizName} />
          <Input
            title={'Quiz Image'}
            value={quizImage}
            setValue={setQuizImage}
          />
          <Input
            title={'Quiz Desciprion'}
            value={quizDescription}
            setValue={setQuizDescription}
          />
          <Input
            title={'Number Of Trials of Quiz'}
            value={quizNumberOfTrials}
            setValue={setQuizNumberOfTrials}
          />
          <Input
            title={'Quiz Time Limit (Minutes)'}
            value={quizTimeLimitMinutes}
            setValue={setQuizTimeLimitMinutes}
          />
          <Input
            title={'Quiz Time Limit (Seconds)'}
            value={quizTimeLimitSeconds}
            setValue={setQuizTimeLimitSeconds}
          />
          {/* <Input
            title={'Quiz RewardType'}
            value={quizRewardType}
            setValue={setQuizRewardType}
          />
          <Input
            title={'Quiz Certificate?'}
            value={quizCertificate}
            setValue={setQuizCertificate}
          />
          <Input
            title={'Quiz Certificate Qualification'}
            value={quizCertificateQualification}
            setValue={setQuizCertificateQualification}
          />
          <Input
            title={'Quiz Badge Qualification'}
            value={quizBadgeQualification}
            setValue={setQuizBadgeQualification}
          />
          <Input
            title={'Quiz Enable Leaderboard'}
            value={quizEnableLeaderboard}
            setValue={setQuizEnableLeaderboard}
          /> */}
          <div className='button-wrapper'>
            <button className='green' onClick={updatequizData}>
              Update
            </button>
            <button className='red' onClick={deletequizData}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default WriteQuiz;
