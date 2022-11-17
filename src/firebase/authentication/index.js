import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';

import { USERS_PATH } from '~/constants';
import realtimeDb from '../realtimeDatabase';

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
                realtimeDb
                    .write(USERS_PATH, user.uid, {
                        uid: user.uid,
                        email: user.email,
                        photoURL: user.photoURL,
                    })
                    .then(() => {
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
                realtimeDb
                    .write(USERS_PATH, user.uid, {
                        uid: user.uid,
                        email: user.email,
                        photoURL: user.photoURL,
                    })
                    .then(() => {
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
