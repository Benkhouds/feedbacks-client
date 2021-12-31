import axios from 'axios';

axios.defaults.withCredentials = true;

const apiRoutes = axios.create({
   baseURL: 'http://localhost:5000/api/v1',
   headers: {
      'Content-Type': 'application/json',
   },
});

export { apiRoutes };
