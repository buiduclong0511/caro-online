import { child, get, getDatabase, onValue, ref, remove, serverTimestamp, set } from 'firebase/database';

const db = {
    write(collection, id, data = {}) {
        const db = getDatabase();
        return set(ref(db, `${collection}/${id}`), {
            ...data,
            updatedAt: serverTimestamp(),
        });
    },
    read(path) {
        const db = getDatabase();

        return new Promise((res, rej) => {
            get(child(ref(db), path))
                .then((snapshot) => res(snapshot.val()))
                .catch((err) => rej(err));
        });
    },
    remove(path) {
        const db = getDatabase();

        return remove(ref(db, path));
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
