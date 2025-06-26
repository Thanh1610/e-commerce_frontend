import { refreshToken } from '@/services/userApi';
import { handleDecoded } from '@/utils/helpers/handleDecoded';
import axios from 'axios';
import type { RefreshTokenResponse } from '@/types/user';
import { store } from '@/redux/store';
import { setUser } from '@/redux/slices/userSlice';

const axiosJwt = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

axiosJwt.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        const { decoded } = handleDecoded();
        const currentTime = Math.floor(Date.now() / 1000);
        //check token
        if (decoded && typeof decoded.exp === 'number' && decoded?.exp < currentTime) {
            const data: RefreshTokenResponse = await refreshToken();
            localStorage.setItem('access_token', data?.newAccessToken);

            const currentUser = store.getState().user;
            store.dispatch(
                setUser({
                    ...currentUser,
                    access_token: data?.newAccessToken,
                }),
            );
            config.headers['authorization'] = `Bearer ${data?.newAccessToken}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);
export default axiosJwt;
