import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api',
  baseURL: 'https://um.cen.medialoger.com/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false // pastiin false biar nggak ngirim cookie CSRF
})

export default api;