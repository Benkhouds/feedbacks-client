import axios from 'axios';

const apiRoutes = axios.create({
  //https://quiet-scrubland-20299.herokuapp.com
  withCredentials: true,
  baseURL: 'https://quiet-scrubland-20299.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

export { apiRoutes };
