import axios, { CanceledError, AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import apiClient from '../services/api-client';

const useData = <T>(endpoint: string, method: 'get' | 'post' | 'patch', requestData?: any, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
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
      setError(err.message);
    } 
    finally {
      setLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};

export default useData;




//   useEffect(() => {
//     const controller = new AbortController();

//     setLoading(true);
//     apiClient({
//       url: endpoint,
//       method,
//       data: requestData,
//       signal: controller.signal,
//       ...requestConfig
//     })
//       .then((res) => {
//         setData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         if (err instanceof CanceledError) return;
//         setError(err.message);
//         setLoading(false);
//       });
//     return () => controller.abort();
//   }, deps ? [...deps] : []);

//   return { data, error, isLoading };
// }