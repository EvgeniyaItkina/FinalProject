import { useState, useCallback } from 'react';
import axios from 'axios';

const baseURL = "http://localhost:2024"

const useAPI = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const apiCall = useCallback(async (method, payload = {}) => {
    try {
      const token = localStorage.getItem('token');
      const header = token ? {
        headers: {
          'x-auth-token': token,
        }
      } : {};
      setIsLoading(true);
      let response;

      switch (method) {
        //cards
        case METHOD.CARDS_GET_ALL:
          response = await axios.get(`${baseURL}/cards`);
          break;

        //client-admin
        case METHOD.USER_REGISTER:
          response = await axios.post(`${baseURL}/auth/register`, payload);

          break;
        case METHOD.USER_LOGIN:
          response = await axios.post(`${baseURL}/auth/login`, payload);
          break;

        default:
          throw new Error('Invalid API method');
      }

      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return [data, error, isLoading, apiCall];
}

export const METHOD = {
  CARDS_GET_ALL: 'CARDS_GET_ALL',


  USER_REGISTER: "USER_REGISTER",
  USER_LOGIN: "USER_LOGIN",
};
export default useAPI;