import { useState } from 'react';
import api from '../utils/api';

export const useScan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scanImage = async (imageFile) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await api.post('/scan/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Scan failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const scanBarcode = async (barcode) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/scan/barcode', { barcode });
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Barcode scan failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getScanHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/scan/history');
      return response.data.scans;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to load scan history';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getScanById = async (scanId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/scan/${scanId}`);
      return response.data.scan;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to load scan';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    scanImage,
    scanBarcode,
    getScanHistory,
    getScanById,
    loading,
    error
  };
};