import type { UserState } from '@/redux/slices/userSlice';

export type User = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    adress?: string;
    avatar?: string;
};

export type Login = {
    email: string;
    password: string;
};

export type LoginResponse = {
    EC: number;
    EM: string;
    access_token: string;
};

export type Register = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone: string;
    adress?: string;
    avatar?: string;
};
export type RegisterResponse = {
    EC: number;
    EM: string;
};

export type GetDetailUser = {
    id: string;
    token: string;
};

export type GetDetailUserResponse = {
    data: {
        status: string;
        message: string;
        data: UserState;
    };
};

export type RefreshTokenResponse = {
    status: string;
    message: string;
    newAccessToken: string;
};

export type UpdateUser = {
    id: string;
    adress: string;
    phone: string;
    name: string;
    email: string;
};

export type UserResponse = {
    status: string;
    message: string;
    data: UserState;
};

export type DeleteUser = {
    _id: string;
};

export type DeleteManyResponse = {
    status: string;
    message: string;
    data: {
        acknowledged: boolean;
        deletedCount: number;
    };
};
