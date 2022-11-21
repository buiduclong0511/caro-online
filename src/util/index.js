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

export const secondToHMS = (second) => {
    const hours = Math.floor(second / 3600);
    const minutes = Math.floor((second - hours * 3600) / 60);
    const seconds = Math.floor(second - minutes * 60);

    return [
        !hours ? '00' : hours >= 10 ? hours : `0${hours}`,
        !minutes ? '00' : minutes >= 10 ? minutes : `0${minutes}`,
        !seconds ? '00' : seconds >= 10 ? seconds : `0${seconds}`,
    ].join(':');
};
