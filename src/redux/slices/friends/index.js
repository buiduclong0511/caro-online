import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import db from '~/firebase/realtimeDatabase';

const initialState = {
    list: [],
    invitingList: [],
    invitedList: [],
};

export const inviteFriend = createAsyncThunk(
    'friends/inviteFriend',
    async (friendUid, { rejectWithValue, getState }) => {
        try {
            const uid = getState().auth.currentUser.uid;
            await db.write(`friends/${uid}/inviting`, friendUid);
            await db.write(`friends/${friendUid}/invited`, uid);
            return true;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

const friends = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        setFriends(state, { payload }) {
            state.list = payload;
        },
        setInvitingFriends(state, { payload }) {
            state.invitingList = payload;
        },
        setInvitedFriends(state, { payload }) {
            state.invitedList = payload;
        },
    },
});

export default friends.reducer;

export const { setFriends, setInvitingFriends, setInvitedFriends } = friends.actions;
