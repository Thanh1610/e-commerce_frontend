import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    name: string;
    email: string;
    access_token: string;
}

const initialState: UserState = {
    name: '',
    email: '',
    access_token: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            const { name, email, access_token } = action.payload;
            state.name = name;
            state.email = email;
            state.access_token = access_token;
        },
        clearUser: (state) => {
            state.name = '';
            state.email = '';
            state.access_token = '';
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
