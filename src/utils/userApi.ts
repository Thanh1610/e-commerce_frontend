import axiosCustom from '@/utils/axios.customzie';
import axiosJwt from '@/utils/axiosJwt';
type User = {
    id: string;
    name: string;
    email: string;
};

type Login = {
    email: string;
    password: string;
};

type LoginResponse = {
    EC: number;
    EM: string;
    access_token: string;
};
const loginApi = (data: Login): Promise<LoginResponse> => {
    const URL_API = '/user/login';
    return axiosCustom.post(URL_API, data);
};

type Register = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone: string;
};
type RegisterResponse = {
    EC: number;
    EM: string;
};
const registerApi = (data: Register): Promise<RegisterResponse> => {
    const URL_API = '/user/register';
    return axiosCustom.post(URL_API, data);
};

type GetDetailUser = {
    id: string;
    token: string;
};

type GetDetailUserResponse = {
    data: {
        status: string;
        message: string;
        data: User;
    };
};

const getDetailUser = (data: GetDetailUser): Promise<GetDetailUserResponse> => {
    const URL_API = `/user/detail-user/${data?.id}`;

    return axiosJwt.get(URL_API, {
        headers: {
            Authorization: `Bearer ${data?.token}`,
        },
    });
};

const refreshToken = () => {
    const URL_API = '/user/refresh-token';

    return axiosCustom.post(URL_API);
};

export { loginApi, registerApi, getDetailUser, refreshToken };
