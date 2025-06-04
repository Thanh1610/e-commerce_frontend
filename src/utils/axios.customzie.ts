import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

//Interceptor này sẽ chạy trước mỗi request được gửi đi.
instance.interceptors.request.use(
    function (config) {
        // Thực hiện trước khi gửi request
        // Lấy ra jwt nếu có
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Trả về lỗi
        return Promise.reject(error);
    },
);

//Interceptor này sẽ chạy sau khi có phản hồi từ server
instance.interceptors.response.use(
    function (response) {
        return response?.data ? response.data : response;
    },
    function (error) {
        if (error?.response?.data) return error?.response?.data;
        return Promise.reject(error);
    },
);

export default instance;
