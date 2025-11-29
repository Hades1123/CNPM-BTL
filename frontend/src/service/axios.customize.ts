import axios from 'axios';

const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    const access_token = localStorage.getItem('access_token');
    config.headers.Authorization = access_token ? `Bearer ${access_token}` : '';
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
