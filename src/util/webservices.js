import axios from 'axios';

const instance = axios.create({
  baseURL: `https://api.stansonly.com/`
});

instance.interceptors.request.use(
  async config => {
    let token = localStorage.getItem('stansonlyadmin');
    config.headers = {
      'x-access-token': token
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

/*

let token = localStorage.getItem('stansonlytoken');
let config = {};

if(token != null) {
  config = { 'x-access-token': token };
}

const instance = axios.create({
    baseURL: `http://stansonlyapi.eu-west-1.elasticbeanstalk.com/`,
    headers: config
  });
*/

export default instance;
