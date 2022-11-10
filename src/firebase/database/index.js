import { getDatabase, onValue, ref, set, get, child } from 'firebase/database';

const db = {
    write(collection, id, data) {
        const db = getDatabase();
        return set(ref(db, `${collection}/${id}`), data);
    },
    read(path) {
        const db = getDatabase();

        return new Promise((res, rej) => {
            get(child(ref(db), path))
                .then((snapshot) => res(snapshot.val()))
                .catch((err) => rej(err));
        });
    },
    onChanged(path, observerCb = () => {}, cancelCb = () => {}) {
        const db = getDatabase();

        return onValue(
            ref(db, path),
            (snapshot) => observerCb(snapshot.val()),
            (err) => cancelCb(err),
        );
    },
};

export default db;
