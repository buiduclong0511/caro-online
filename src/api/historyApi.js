import { HISTORIES_PATH } from '~/constants';
import db from '~/firebase/realtimeDatabase';

const historyApi = {
    async create({ roomId, members, winner } = {}) {
        try {
            await db.write(HISTORIES_PATH, roomId, {
                members,
                winner,
            });
        } catch (err) {
            return err;
        }
    },
};

export default historyApi;
