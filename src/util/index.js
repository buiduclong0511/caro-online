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

const dir = [
    [-4, 0],
    [0, 4],
    [4, 0],
    [0, -4],
    [-4, -4],
    [-4, 4],
    [4, 4],
    [4, -4],
];
const checkPoint = (dir, xPositions, oPositions, position) => {
    const label = xPositions.some((xPosition) => xPosition[0] === position[0] && xPosition[1] === position[1])
        ? 'x'
        : 'o';

    let pointsCount = 0;
    const points = [];
    for (let i = 0; i < 5; i++) {
        let newX = position[0];
        let newY = position[1];
        if (dir[0] > 0) {
            newX += i;
        } else if (dir[0] < 0) {
            newX -= i;
        }
        if (dir[1] > 0) {
            newY += i;
        } else if (dir[1] < 0) {
            newY -= i;
        }
        const nextPosition = [newX, newY];
        let nextLabel = xPositions.some(
            (xPosition) => xPosition[0] === nextPosition[0] && xPosition[1] === nextPosition[1],
        )
            ? 'x'
            : '';
        if (!nextLabel) {
            nextLabel = oPositions.some(
                (oPosition) => oPosition[0] === nextPosition[0] && oPosition[1] === nextPosition[1],
            )
                ? 'o'
                : '';
        }
        if (nextLabel !== label) {
            break;
        } else {
            pointsCount++;
            points.push(nextPosition);
        }
    }

    return pointsCount >= 5
        ? {
              result: true,
              points,
              label,
          }
        : {
              result: false,
              points,
              label,
          };
};
export const check = (xPositions, oPositions, position) => {
    let result;
    dir.some((item) => {
        const checkedPoint = checkPoint(item, xPositions, oPositions, position);
        if (checkedPoint.result) {
            result = checkedPoint;
        }
        return checkedPoint.result;
    });

    let preventCount = 0;
    if (result?.result) {
        const position1 = result.points[0];
        const position11 = result.points[1];
        const position2 = result.points[result.points.length - 1];
        const position21 = result.points[result.points.length - 2];

        if (result.label === 'x') {
            const newX = position1[0] - (position11[0] - position1[0]);
            const newY = position1[1] - (position11[1] - position1[1]);
            const newPosition = [newX, newY];
            if (newX >= 0 && newY >= 0) {
                oPositions.some((position) => {
                    const rs = position[0] === newPosition[0] && position[1] === newPosition[1];
                    if (rs) preventCount++;
                    return rs;
                });
            }
        } else {
            const newX = position1[0] - (position11[0] - position1[0]);
            const newY = position1[1] - (position11[1] - position1[1]);
            const newPosition = [newX, newY];
            if (newX >= 0 && newY >= 0) {
                xPositions.some((position) => {
                    const rs = position[0] === newPosition[0] && position[1] === newPosition[1];
                    if (rs) preventCount++;
                    return rs;
                });
            }
        }

        if (result.label === 'x') {
            const newX = position2[0] - (position21[0] - position2[0]);
            const newY = position2[1] - (position21[1] - position2[1]);
            const newPosition = [newX, newY];
            console.log('newPosition', newPosition);
            if (newX >= 0 && newY >= 0) {
                oPositions.some((position) => {
                    const rs = position[0] === newPosition[0] && position[1] === newPosition[1];
                    if (rs) preventCount++;
                    return rs;
                });
            }
        } else {
            const newX = position2[0] - (position21[0] - position2[0]);
            const newY = position2[1] - (position21[1] - position2[1]);
            const newPosition = [newX, newY];
            if (newX >= 0 && newY >= 0) {
                xPositions.some((position) => {
                    const rs = position[0] === newPosition[0] && position[1] === newPosition[1];
                    if (rs) preventCount++;
                    return rs;
                });
            }
        }
    }

    return result && preventCount < 2 ? result : { result: false, points: [], label: '' };
};

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
