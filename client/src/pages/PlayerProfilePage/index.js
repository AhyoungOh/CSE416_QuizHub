import { useParams } from 'react-router-dom';
import PlayerProfile from '../../components/PlayerProfile';

export default function PlayerProfilePage(){
    const { id } = useParams();
    console.log("id", id)
    return(
        <div>
            <PlayerProfile />
        </div>
    );
};