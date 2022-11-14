import { where } from 'firebase/firestore';
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '~/firebase/authentication';
import db from '~/firebase/database';

const authApi = {
    loginWithEmail(email = '', password = '') {
        return signInWithEmail(email, password);
    },
    loginWithGoogle() {
        return new Promise((res, rej) => {
            signInWithGoogle()
                .then((user) => {
                    db.index('users', where('uid', '==', user.uid)).then((users) => {
                        if (!users.length) {
                            db.store('users', {
                                uid: user.uid,
                                email: user.email,
                                photoURL: user.photoURL || '',
                            });
                        } else {
                            db.updateById('users', users[0].id, {
                                uid: user.uid,
                                email: user.email,
                                photoURL: user.photoURL || '',
                            });
                        }

                        res(user);
                    });
                })
                .catch((err) => rej(err));
        });
    },
    registerWithEmail(email = '', password) {
        return new Promise((res, rej) => {
            signUpWithEmail(email, password)
                .then((user) => {
                    db.store('users', {
                        uid: user.uid,
                        email: user.email,
                        photoURL: user.photoURL || '',
                    });
                    res(user);
                })
                .catch((err) => {
                    rej(err);
                });
        });
    },
};

export default authApi;
