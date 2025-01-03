// import axios from "axios";
// import { cookies } from "next/headers";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_API,
// });

// axiosInstance.interceptors.request.use(
//   function (config) {
//     const cookieStore = cookies();
//     const accessToken = cookieStore.get("accessToken")?.value;

//     if (accessToken) {
//       config.headers!.Authorization = accessToken;
//     }

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     // Check for 401 errors, but since no refresh mechanism is present, simply reject the error.
//     if (error?.response?.status === 401) {
//       console.error("Unauthorized: Invalid or expired access token.");
//       // Optionally, you can clear the cookie here if needed:
//       cookies().delete("accessToken");
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

// Request interceptor to attach the token from localStorage
axiosInstance.interceptors.request.use(
  function (config) {
    if (typeof window !== "undefined") { // Ensure this runs on the client side
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers!.Authorization = `Bearer ${accessToken}`; // Include Bearer if required
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      console.error("Unauthorized: Invalid or expired access token.");
      if (typeof window !== "undefined") { // Ensure this runs on the client side
        localStorage.removeItem("accessToken");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
