import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

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
            .then((userCredential) => res(userCredential.user))
            .catch((err) => rej(err));
    });
};

export const signInWithGoogle = () => {
    return new Promise((res, rej) => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => res(result.user))
            .catch((err) => rej(err));
    });
};
