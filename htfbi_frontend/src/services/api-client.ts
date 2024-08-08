import axios from 'axios';

const token = import.meta.env.VITE_API_TOKEN;

export default axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    Authorization: `Bearer ${token}`
  }
});