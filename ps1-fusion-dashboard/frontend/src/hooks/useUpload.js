import { useState } from 'react';
import axios from 'axios';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Custom Hook: Intelligence Ingestion (Upload)
 */

export const useUpload = () => {
  const [loading, setLoading] = useState({ csv: false, json: false, image: false });
  const [error, setError] = useState({ csv: null, json: null, image: null });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  /**
   * Clears error state for a specific upload type.
   */
  const clearError = (type) => {
    setError(prev => ({ ...prev, [type]: null }));
  };

  /**
   * Upload and process CSV file via backend.
   */
  const uploadCSV = async (file) => {
    setLoading(prev => ({ ...prev, csv: true }));
    clearError('csv');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/api/upload/csv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Intelligence data upload failure.';
      setError(prev => ({ ...prev, csv: msg }));
      throw new Error(msg);
    } finally {
      setLoading(prev => ({ ...prev, csv: false }));
    }
  };

  /**
   * Upload and process JSON file via backend.
   */
  const uploadJSON = async (file) => {
    setLoading(prev => ({ ...prev, json: true }));
    clearError('json');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/api/upload/json`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'JSON intelligence upload failure.';
      setError(prev => ({ ...prev, json: msg }));
      throw new Error(msg);
    } finally {
      setLoading(prev => ({ ...prev, json: false }));
    }
  };

  /**
   * Upload image for IMINT nodes.
   */
  const uploadImage = async (file) => {
    setLoading(prev => ({ ...prev, image: true }));
    clearError('image');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/api/upload/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Tactical imagery upload failure.';
      setError(prev => ({ ...prev, image: msg }));
      throw new Error(msg);
    } finally {
      setLoading(prev => ({ ...prev, image: false }));
    }
  };

  return {
    uploadCSV,
    uploadJSON,
    uploadImage,
    loading,
    error,
    clearError
  };
};


