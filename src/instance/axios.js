import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081",
});

instance.defaults.withCredentials = true; // use to set value of cookie

// set header authorization

//instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;

instance.interceptors.request.use(
  function (config) {
    // const token = localStorage.getItem("access_token");
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const status = error?.response?.status || 500;
    //const status = 500
    // we can handle global errors here
    return Promise.reject(error);
  }
);
export default instance;
