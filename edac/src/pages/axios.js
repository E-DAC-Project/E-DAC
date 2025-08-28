
import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // JWT expired or unauthorized → redirect to login
      sessionStorage.clear();
      window.location.href = '/login';  // adjust to your login path
      toast.warning("Token expired please login again")
    }
    return Promise.reject(error);
  }
);

export default instance;
