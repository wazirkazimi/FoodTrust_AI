import { useState } from 'react';

export default function useScan() {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performScan = async (data) => {
    setLoading(true);
    try {
      // call API to scan
      // setScanResult(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { scanResult, loading, error, performScan };
}
