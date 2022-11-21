import { useEffect, useState } from 'react';

function useClock() {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((pre) => pre + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return {
        time,
    };
}

export default useClock;
