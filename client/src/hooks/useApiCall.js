import { useState, useEffect } from 'react';
import axios from 'axios';

function useApiCall(apiUrl, withCredentials = false) {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl, { withCredentials });
      setPayload(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  return [loading, payload, error, fetchData];
}

export default useApiCall;
