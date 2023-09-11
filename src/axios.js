import axios from 'axios'
import {BASE_URL, TOKEN, USER} from './config'
import router from './routes';

const Axios = axios.create({
  baseURL: BASE_URL
});

Axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    config.headers['Authorization'] = `${token}`;
  } else {
    config.headers['Authorization'] = 'Lira';
  }
  if (!config.headers || !config.headers['Content-Type'] || !config.headers['Content-Type'].includes('multipart/')) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});

Axios.interceptors.response.use(function(response) {
  const res = response.data.response;
  // window.console.log(router.currentRoute);
  if (res && !res.status && res.message && res.message.includes('Token') && !router.currentRoute.path.includes('login')) {
    window.alert(res.message);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    router.push({name: 'login'});
    return;
  }
  return Promise.resolve(response);
}, function(error) {
  window.console.log(error);
  const status = error.response ? error.response.status : null;
  if (status == 401) {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    router.push({name: 'login'});
  }

  return Promise.reject(error);
});

export default Axios;