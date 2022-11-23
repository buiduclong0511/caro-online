import { USERS_PATH } from '~/constants';
import db from '~/firebase/realtimeDatabase';
import store from '~/redux';

const userApi = {
    async updateStats(type) {
        try {
            const users = store.getState().users;
            const uid = store.getState().auth.currentUser.uid;

            const user = users.find((user) => user.uid === uid);
            if (user.isPlaying) {
                await db.update(`${USERS_PATH}/${uid}/${type}`, user[type] + 1);
                if (type === 'win') {
                    await db.update(`${USERS_PATH}/${uid}/scores`, user.scores + 5);
                } else {
                    await db.update(`${USERS_PATH}/${uid}/scores`, user.scores - 5);
                }
                if (user.level * 10 > user.exp) {
                    await db.update(`${USERS_PATH}/${uid}/exp`, user.exp + 10);
                } else {
                    await db.update(`${USERS_PATH}/${uid}/level`, user.level + 1);
                    await db.update(`${USERS_PATH}/${uid}/exp`, 0);
                }
                await db.update(`${USERS_PATH}/${uid}/isPlaying`, false);
            }

            return true;
        } catch (err) {
            return err;
        }
    },
};

export default userApi;
