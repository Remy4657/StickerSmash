import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:8081',

});

instance.defaults.withCredentials = true; // use to set value of cookie


// set header authorization

//instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;

instance.interceptors.request.use(function (config) {

    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
let countRun = 0
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
}, async function (error) {


    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const status = error.response.status || 500;
    //const status = 500
    // we can handle global errors here
    switch (status) {
        // authentication (token related issues)
        case 401: {
            //  return Promise.reject(error); // return the nay thi o react khong nhan duoc ket qua phan hoi
            return error.response.data;
        }

        // forbidden (permission related issues)
        case 403: {
            return Promise.reject(error);
        }

        // bad request
        case 400: {
            return Promise.reject(error);
        }

        // not found
        case 404: {
            return Promise.reject(error);
        }

        // conflict
        case 409: {
            return Promise.reject(error);
        }

        // unprocessable
        case 422: {
            return Promise.reject(error);
        }

        // generic api error (server related) unexpected
        default: {
            return error?.response?.data ?? Promise.reject(error);
        }
    }
});
export default instance