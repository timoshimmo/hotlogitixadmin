import axios from 'axios';

const instance = axios.create({
  baseURL: `https://api.stansonly.com/`
});

instance.interceptors.request.use(
  async config => {
    let token = localStorage.getItem('stansonlytoken');
    config.headers = {
      'x-access-token': token
    }
    return config;
  },
  error => {
    Promise.reject(error)
});


export default instance;
