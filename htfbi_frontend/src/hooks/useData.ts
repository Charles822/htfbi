import axios, { CanceledError, AxiosRequestConfig, AxiosError } from "axios";
import { useState, useEffect } from "react";
import apiClient from '../services/api-client';

const useData = <T>(endpoint: string, method: 'get' | 'post' | 'patch', requestData?: any, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const execute = async (requestData) => {
    setLoading(true);
    try {
      const response = await apiClient({
        url: endpoint,
        method,
        data: requestData,
        ...requestConfig
      });
      console.log('Response data:', response.data);
      setData(response.data);
    } 
    catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage); 
    } else {
      setError('An unexpected error occurred');
    }
    console.error('Error fetching data:', err);
  } finally {
    setLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};

export default useData;