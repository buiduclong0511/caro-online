import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, { payload }) {
            return payload;
        },
    },
});

export default usersSlice.reducer;

export const { setUsers } = usersSlice.actions;
