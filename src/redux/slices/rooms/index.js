import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { ROOMS_PATH } from '~/constants';
import db from '~/firebase/realtimeDatabase';

const initialState = [];

export const createRoom = createAsyncThunk('rooms/createRoom', async (data, { rejectWithValue, getState }) => {
    try {
        const masterUid = getState().auth.currentUser.uid;
        await db.write(ROOMS_PATH, uuid(), {
            masterUid,
            members: {
                [masterUid]: masterUid,
            },
            audiences: {},
        });

        return true;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const outRoom = createAsyncThunk('rooms/outRoom', async (data, { rejectWithValue, getState }) => {
    try {
        const uid = getState().auth.currentUser.uid;
        const rooms = getState().rooms;
        rooms.forEach(({ id, ...room }) => {
            if (room.masterUid === uid) {
                db.remove(`${ROOMS_PATH}/${id}`);
            } else if (room.members.includes(uid)) {
                const newMembers = room.members
                    .filter((member) => member !== uid)
                    .reduce((prev, curr) => {
                        return {
                            ...prev,
                            [curr]: curr,
                        };
                    }, {});
                const audiences = room.audiences.reduce((prev, curr) => {
                    return {
                        ...prev,
                        [curr]: [curr],
                    };
                }, {});
                db.write(ROOMS_PATH, id, {
                    ...room,
                    members: newMembers,
                    audiences,
                });
            } else if (room.audiences.includes(uid)) {
                const newAudiences = room.audiences
                    .filter((audience) => audience !== uid)
                    .reduce((prev, curr) => {
                        return {
                            ...prev,
                            [curr]: curr,
                        };
                    }, {});
                const members = room.members.reduce((prev, curr) => {
                    return {
                        ...prev,
                        [curr]: [curr],
                    };
                }, {});
                db.write(ROOMS_PATH, id, {
                    ...room,
                    audiences: newAudiences,
                    members,
                });
            }
        });
    } catch (err) {}
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
