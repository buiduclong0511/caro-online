import { useEffect, useState } from 'react';
import { cx } from '~/util';

function Avatar({ src = '', alt = '', fallback = '/images/fallbackavt.jpg', className = '', size = 40, ...props }) {
    const [_src, setSrc] = useState(null);

    useEffect(() => {
        setSrc(src || fallback);
    }, [fallback, src]);

    return (
        <img
            style={{ width: `${size}px`, height: `${size}px` }}
            src={_src}
            alt={alt}
            className={cx(`object-cover rounded-full`, className)}
            onError={() => setSrc(fallback)}
        />
    );
}

export default Avatar;
