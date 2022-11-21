import { v4 as uuid } from 'uuid';

import { ROOMS_PATH } from '~/constants';
import db from '~/firebase/realtimeDatabase';
import store from '~/redux';

const roomApi = {
    async create() {
        try {
            const state = store.getState();

            const masterUid = state.auth.currentUser.uid;
            const currentRoom = state.rooms.find(
                (room) => room.members.includes(masterUid) || room.audiences.includes(masterUid),
            );

            if (!currentRoom) {
                const roomId = uuid();
                await db.write(ROOMS_PATH, roomId, {
                    masterUid,
                    members: {
                        [masterUid]: masterUid,
                    },
                    audiences: {},
                    status: 'waiting',
                });

                return roomId;
            }
        } catch (err) {
            return err;
        }
    },
    async leave() {
        try {
            const state = store.getState();
            const uid = state.auth.currentUser.uid;
            const rooms = state.rooms;
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
                    db.update(`${ROOMS_PATH}/${id}/members`, newMembers);
                } else if (room.audiences.includes(uid)) {
                    const newAudiences = room.audiences
                        .filter((audience) => audience !== uid)
                        .reduce((prev, curr) => {
                            return {
                                ...prev,
                                [curr]: curr,
                            };
                        }, {});
                    db.update(`${ROOMS_PATH}/${id}/audiences`, newAudiences);
                }
            });
        } catch (err) {
            return err;
        }
    },
};

export default roomApi;
