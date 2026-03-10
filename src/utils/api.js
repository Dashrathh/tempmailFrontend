import axios from "axios";

const BASE_URL =
    process.env.NEXT_BACKEND_API ||
    process.env.NEXT_PUBLIC_BACKEND_API ||
    process.env.NEXT_PUBLIC_API ||
    "http://localhost:3000/api";

export const API = axios.create({
    baseURL: BASE_URL,
});

// Add a request interceptor
API.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Add a response interceptor
API.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const errorResponse = error?.response?.data;

        if (errorResponse) {
            return Promise.reject(errorResponse);
        }
        return Promise.reject(error);
    },
);
