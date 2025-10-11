import axios from 'axios';

const api = axios.create({
  baseURL: 'https://um.cen.medialoger.com/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false // pastiin false biar nggak ngirim cookie CSRF
})

export default api;