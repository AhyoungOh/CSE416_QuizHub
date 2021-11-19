import axios from 'axios';
import { useState, useEffect } from 'react';

function ApiCall() {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        process.env.NODE_ENV == 'production'
          ? `/platform`
          : `http://localhost:4000/platform`
      );
      setLoading(false);
      setPayload(response.data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading === true) {
    return <div>Loading</div>;
  }
  if (error !== null) {
    return <div>error</div>;
  }
  return <div>{JSON.stringify(payload)}</div>;
}

export default ApiCall;
