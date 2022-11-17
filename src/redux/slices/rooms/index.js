import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { serverTimestamp } from 'firebase/database';
import { ROOMS_PATH } from '~/constants';
import realtimeDb from '~/firebase/realtimeDatabase';

const initialState = [];

export const createRoom = createAsyncThunk('rooms/createRoom', async (data, { rejectWithValue, getState }) => {
    try {
        const masterUid = getState().auth.currentUser.uid;
        await realtimeDb.write(ROOMS_PATH, uuid(), {
            masterUid,
            members: {
                [masterUid]: masterUid,
            },
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return true;
    } catch (err) {
        return rejectWithValue(err);
    }
});

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
