import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import useApiCall from '../../hooks/useApiCall';
import ConsumerMyBadges from '../../components/Form/ConsumerMyBadges';
import Player from '../../components/PlayerProfile';

export default function PlayerProfilePage(){
    const { id } = useParams();
    console.log("id", id)
    return(
        <div>
            <Player />
        </div>
    );
};