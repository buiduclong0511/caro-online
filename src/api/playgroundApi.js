import { v4 as uuid } from 'uuid';

import { PLAYGROUNDS_PATH } from '~/constants';
import db from '~/firebase/realtimeDatabase';
import store from '~/redux';

const playgroundApi = {
    async create() {
        try {
            const state = store.getState();

            const uid = state.auth.currentUser.uid;
            const currentRoom = state.rooms.find((room) => room.members.includes(uid) || room.audiences.includes(uid));

            if (!currentRoom) {
                return Promise.reject('Room not found.');
            }

            await db.write(PLAYGROUNDS_PATH, currentRoom.id, {
                currentTurn: 'x',
                labels: {
                    [currentRoom.members[0]]: 'x',
                    [currentRoom.members[1]]: 'o',
                },
                board: {
                    x: {},
                    o: {},
                },
                lastPosition: [],
            });

            return true;
        } catch (err) {
            return err;
        }
    },
    async tick(label, position) {
        try {
            const state = store.getState();

            const uid = state.auth.currentUser.uid;
            const currentRoom = state.rooms.find((room) => room.members.includes(uid) || room.audiences.includes(uid));

            if (!currentRoom) {
                return Promise.reject('Room not found.');
            }

            await db.update(
                `${PLAYGROUNDS_PATH}/${currentRoom.id}/board/${label}/${uuid()}`,
                `${position[0]},${position[1]}`,
            );
            await db.update(`${PLAYGROUNDS_PATH}/${currentRoom.id}/lastPosition`, position);
            await db.update(`${PLAYGROUNDS_PATH}/${currentRoom.id}/currentTurn`, label === 'x' ? 'o' : 'x');

            return true;
        } catch (err) {
            return err;
        }
    },
};

export default playgroundApi;
