import axios from '@/utils/axios.customzie';

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
    return axios.post(URL_API, data);
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
    return axios.post(URL_API, data);
};

type GetDetailUser = {
    id: string;
    token: string;
};

type GetDetailUserResponse = {
    data: User;
};

const getDetailUser = (data: GetDetailUser): Promise<GetDetailUserResponse> => {
    const URL_API = `/user/detail-user/${data?.id}`;
    console.log('check data.id: ', data?.id);

    return axios.get(URL_API, {
        headers: {
            Authorization: `Bearer ${data?.token}`,
        },
    });
};

export { loginApi, registerApi, getDetailUser };
