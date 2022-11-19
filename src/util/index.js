import { toast } from 'react-toastify';

export const cx = (...args) => {
    return args
        .map((arg) => {
            if (!arg) {
                return '';
            }
            if (typeof arg === 'string') {
                return arg;
            }
            return Object.keys(arg)
                .filter((key) => arg[key])
                .join(' ');
        })
        .join(' ');
};

export const board = (() => {
    const result = [];

    for (let i = 0; i < 100; i++) {
        result.push([]);
        for (let j = 0; j < 100; j++) {
            result[i].push('');
        }
    }

    return result;
})();

export const storage = (() => {
    const STORAGE_KEY = 'storage';
    let storage = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');

    return {
        set(key, value) {
            storage[key] = value;
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
        },
        get(key) {
            return storage ? storage[key] : null;
        },
        remove(key) {
            delete storage[key];
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
        },
        clear() {
            storage = null;
            window.localStorage.removeItem(STORAGE_KEY);
        },
    };
})();

export const handleFirebaseError = (err) => {
    switch (err.code) {
        case 'auth/user-not-found':
            toast.error('User not found');
            break;
        case 'auth/wrong-password':
            toast.error('Wrong password');
            break;
        default:
            toast.error('Something went wrong. Please try again later');
    }
};
