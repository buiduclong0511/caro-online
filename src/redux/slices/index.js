import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';
import friendsReducer from './friends';
import roomsReducer from './rooms';
import usersReducer from './users';

export * from './auth';
export * from './friends';
export * from './rooms';
export * from './users';

const rootReducer = combineReducers({
    auth: authReducer,
    rooms: roomsReducer,
    users: usersReducer,
    friends: friendsReducer,
});

export default rootReducer;
