import { cx } from '~/util';

function Avatar({ src = '', alt = '', className = '', size = 40, ...props }) {
    return (
        <img
            style={{ width: `${size}px`, height: `${size}px` }}
            src={src || '/images/fallbackavt.jpg'}
            alt={alt}
            className={cx(`object-cover rounded-full`, className)}
        />
    );
}

export default Avatar;
