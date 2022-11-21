import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRooms(state, { payload }) {
            return payload;
        },
    },
});

export default roomsSlice.reducer;

export const { setRooms } = roomsSlice.actions;
