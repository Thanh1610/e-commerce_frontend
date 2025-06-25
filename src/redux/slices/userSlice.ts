import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/user';

export interface UserState extends User {
    access_token: string;
}

const initialState: UserState = {
    _id: '',
    name: '',
    email: '',
    phone: '',
    access_token: '',
    address: '',
    avatar: '',
    isAdmin: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            const { name, email, access_token, phone, address, _id, avatar, isAdmin } = action.payload;
            state._id = _id;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.access_token = access_token;
            state.avatar = avatar;
            state.isAdmin = isAdmin;
        },
        clearUser: (state) => {
            state.name = '';
            state.email = '';
            state.phone = '';
            state.address = '';
            state.access_token = '';
            state.avatar = '';
            state.isAdmin = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
