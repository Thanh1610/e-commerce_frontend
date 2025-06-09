import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    adress?: string;
    avatar?: string;
    access_token: string;
    isAdmin: boolean;
}

const initialState: UserState = {
    _id: '',
    name: '',
    email: '',
    phone: '',
    access_token: '',
    adress: '',
    avatar: '',
    isAdmin: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            const { name, email, access_token, phone, adress, _id, avatar, isAdmin } = action.payload;
            state._id = _id;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.adress = adress;
            state.access_token = access_token;
            state.avatar = avatar;
            state.isAdmin = isAdmin;
        },
        clearUser: (state) => {
            state.name = '';
            state.email = '';
            state.phone = '';
            state.adress = '';
            state.access_token = '';
            state.avatar = '';
            state.isAdmin = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
