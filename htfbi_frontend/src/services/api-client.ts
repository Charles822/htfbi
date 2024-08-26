import axios from 'axios';

const token = import.meta.env.VITE_API_TOKEN;

export const baseURL = 'http://127.0.0.1:8000';

export default axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});