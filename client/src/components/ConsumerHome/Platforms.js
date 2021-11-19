import SinglePlatformCard from './SinglePlatformCard';
import useApiCall from '../../hooks/useApiCall';

export default function Platforms({ searchWord, searchType }) {
  const [loading, payload, error] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/creatorHome`
      : `http://localhost:4000/api/creatorHome`,
    { withCredentials: true }
  );
  if (!payload) {
    return <div>No Data</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error...</div>;
  }
  const platformData = payload.createPlatform;
  const PlatformCardList = platformData
    .filter((data) => {
      if (searchWord === null) return true;

      if (searchType !== 'Platform') return false;

      return data.platformName.toUpperCase().includes(searchWord.toUpperCase());
    })
    .map((data) => {
      return <SinglePlatformCard platformData={data} />;
    });
  return <div className='mb-3'>{PlatformCardList}</div>;
}
