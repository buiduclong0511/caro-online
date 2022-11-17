import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';
import roomsReducer from './rooms';
import usersReducer from './users';

export * from './auth';
export * from './rooms';
export * from './users';

const rootReducer = combineReducers({
    auth: authReducer,
    rooms: roomsReducer,
    users: usersReducer,
});

export default rootReducer;
