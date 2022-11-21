import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';

import { USERS_PATH } from '~/constants';
import db from '../realtimeDatabase';

export const signInWithEmail = (email, password) => {
    return new Promise((res, rej) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => res(userCredential.user))
            .catch((err) => rej(err));
    });
};

export const signUpWithEmail = (email, password) => {
    return new Promise((res, rej) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                db.write(USERS_PATH, user.uid, {
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL,
                    scores: 0,
                    online: false,
                    level: 1,
                    exp: 0,
                    win: 0,
                    lose: 0,
                    draw: 0,
                }).then(() => {
                    res(user);
                });
            })
            .catch((err) => rej(err));
    });
};

export const signInWithGoogle = () => {
    return new Promise((res, rej) => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                db.write(USERS_PATH, user.uid, {
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL,
                    scores: 0,
                    online: false,
                    level: 0,
                    exp: 0,
                    win: 0,
                    lose: 0,
                    draw: 0,
                }).then(() => {
                    res(user);
                });
            })
            .catch((err) => rej(err));
    });
};

export const signOut = () => {
    const auth = getAuth();
    auth.signOut();
};
