import axios from "axios";
import APIError from "../Error/Eror";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

instance.defaults.withCredentials = true;
// instance.defaults.headers.common["Authorization"] = ` `;
// Add a request interceptor for 'instance'
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor for 'instance'
instance.interceptors.response.use(
  function (res) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return res;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const status = (error && error.response && error.response.status) || 500;

    switch (status) {
      // authentication (token related issues)
      case 401: {
        toast.error("Request failed with status code 401");
        window.location.href = "/login";
        return Promise.reject(new APIError(error.message, 401));
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("You dont permision to acces this resource");
        return Promise.reject(new APIError(error.message, 403));
      }

      // bad request
      case 400: {
        return Promise.reject(new APIError(error.message, 400));
      }

      // not found
      case 404: {
        return Promise.reject(new APIError(error.message, 404));
      }

      // conflict
      case 409: {
        return Promise.reject(new APIError(error.message, 409));
      }

      // unprocessable
      case 422: {
        return Promise.reject(new APIError(error.message, 422));
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(new APIError(error.message, 500));
      }
    }
  }
);

export default instance;
