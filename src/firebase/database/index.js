import { query } from 'firebase/database';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore';

class Db {
    async store(collectionName, data) {
        const db = getFirestore();
        const _data = {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };
        return await addDoc(collection(db, collectionName), _data);
    }

    async show(collectionName, id) {
        const db = getFirestore();

        const _doc = await getDoc(doc(db, collectionName, id));

        return {
            ..._doc.data(),
            id: _doc.id,
        };
    }

    async index(collectionName, ...queryConstraints) {
        const db = getFirestore();

        const _queryConstraints = [collection(db, collectionName), ...queryConstraints];
        const _doc = await getDocs(query(..._queryConstraints));

        const data = [];
        _doc.forEach((doc) =>
            data.push({
                ...doc.data(),
                id: doc.id,
            }),
        );

        return data;
    }

    async updateById(collectionName, id, data) {
        const db = getFirestore();
        const updateRef = doc(db, collectionName, id);

        const res = await updateDoc(updateRef, data);

        return res;
    }
}

export default new Db();
