import axios from '@/utils/axios.customzie';

type Login = {
    email: string;
    password: string;
};

type Register = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone: string;
};

const loginApi = (data: Login) => {
    const URL_API = '/user/login';
    return axios.post(URL_API, data);
};

const registerApi = (data: Register) => {
    const URL_API = '/user/register';
    return axios.post(URL_API, data);
};

export { loginApi, registerApi };
