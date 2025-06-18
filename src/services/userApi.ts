import axiosCustom from '@/utils/axios.customzie';
import axiosJwt from '@/utils/axiosJwt';
import type {
    Login,
    LoginResponse,
    Register,
    RegisterResponse,
    GetDetailUser,
    GetDetailUserResponse,
    RefreshTokenResponse,
    UserResponse,
    UpdateUser,
    DeleteUser,
    DeleteManyResponse,
} from '@/types/user';

const loginApi = async (data: Login): Promise<LoginResponse> => {
    const URL_API = '/user/login';
    return await axiosCustom.post(URL_API, data);
};

const registerApi = async (data: Register): Promise<RegisterResponse> => {
    const URL_API = '/user/register';
    return await axiosCustom.post(URL_API, data);
};

const getDetailUser = async (data: GetDetailUser): Promise<GetDetailUserResponse> => {
    const URL_API = `/user/detail-user/${data?.id}`;
    return await axiosJwt.get(URL_API);
};

const refreshToken = async (): Promise<RefreshTokenResponse> => {
    const URL_API = '/user/refresh-token';
    return await axiosCustom.post(URL_API);
};

const logoutUser = async () => {
    const URL_API = '/user/logout';
    return await axiosCustom.post(URL_API);
};

const updateUser = async (data: UpdateUser): Promise<UserResponse> => {
    const URL_API = `/user/update-user/${data?.id}`;
    return await axiosCustom.put(URL_API, data);
};

const getAllUser = async () => {
    const URL_API = '/user/users';
    return await axiosCustom.get(URL_API);
};

const deleteUser = async ({ _id }: DeleteUser): Promise<UserResponse> => {
    const URL_API = `/user/delete-user/${_id}`;
    return await axiosCustom.delete(URL_API);
};

const deleteManyUser = async (userIds: string[]): Promise<DeleteManyResponse> => {
    const URL_API = '/user/delete-many';
    return await axiosCustom.delete(URL_API, { data: userIds });
};

export {
    loginApi,
    registerApi,
    getDetailUser,
    refreshToken,
    logoutUser,
    updateUser,
    getAllUser,
    deleteUser,
    deleteManyUser,
};
