import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.currentUser = payload;
        },
        clearUser: (state) => {
            state.currentUser = null;
        },
    },
});

export default authSlice.reducer;

export const { setUser, clearUser } = authSlice.actions;
