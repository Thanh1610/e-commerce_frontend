import axiosCustom from '@/utils/axios.customzie';
import axiosJwt from '@/utils/axiosJwt';
import type { UserState } from '@/redux/slices/userSlice';

type Login = {
    email: string;
    password: string;
};

type LoginResponse = {
    EC: number;
    EM: string;
    access_token: string;
};
const loginApi = async (data: Login): Promise<LoginResponse> => {
    const URL_API = '/user/login';
    return await axiosCustom.post(URL_API, data);
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
const registerApi = async (data: Register): Promise<RegisterResponse> => {
    const URL_API = '/user/register';
    return await axiosCustom.post(URL_API, data);
};

type GetDetailUser = {
    id: string;
    token: string;
};

type GetDetailUserResponse = {
    data: {
        status: string;
        message: string;
        data: UserState;
    };
};

const getDetailUser = async (data: GetDetailUser): Promise<GetDetailUserResponse> => {
    const URL_API = `/user/detail-user/${data?.id}`;

    return await axiosJwt.get(URL_API, {
        headers: {
            Authorization: `Bearer ${data?.token}`,
        },
    });
};

const refreshToken = async () => {
    const URL_API = '/user/refresh-token';

    return await axiosCustom.post(URL_API);
};

const logoutUser = async () => {
    const URL_API = '/user/logout';

    return await axiosCustom.post(URL_API);
};

type UpdatelUser = {
    id: string;
    token: string;
    adress: string;
    phone: string;
    name: string;
    email: string;
};

type UpdateUserResponse = {
    status: string;
    message: string;
    data: UserState;
};
const updateUser = async (data: UpdatelUser): Promise<UpdateUserResponse> => {
    const URL_API = `/user/update-user/${data?.id}`;
    const { token, ...updateData } = data;
    return await axiosCustom.put(URL_API, updateData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { loginApi, registerApi, getDetailUser, refreshToken, logoutUser, updateUser };
