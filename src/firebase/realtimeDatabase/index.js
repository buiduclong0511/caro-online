import { child, get, getDatabase, onValue, ref, remove, serverTimestamp, set, update } from 'firebase/database';

const db = {
    write(collection, id, data = {}) {
        const db = getDatabase();
        return set(ref(db, `${collection}/${id}`), {
            ...data,
            createdAt: serverTimestamp(),
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
    update(path, newData) {
        const db = getDatabase();

        return update(ref(db), {
            [path]: newData,
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
