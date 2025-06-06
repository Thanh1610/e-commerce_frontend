import { refreshToken } from '@/utils/userApi';
import { handleDecoded } from '@/utils/helpers/handleDecoded';
import axios from 'axios';

const axiosJwt = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosJwt.interceptors.request.use(
    async (config) => {
        const { decoded } = handleDecoded();
        const currentTime = Math.floor(Date.now() / 1000);
        //check token
        if (decoded && typeof decoded.exp === 'number' && decoded?.exp < currentTime) {
            const data = await refreshToken();

            config.headers['authorization'] = `Bearer ${data?.data?.token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);
export default axiosJwt;
