import { cx } from '~/util';

function Avatar({ src, className = '', size = 40, ...props }) {
    return (
        <img
            src={src ? src : '/images/fallbackavt.jpg'}
            alt="avatar"
            className={cx(`w-[${size}px] h-[${size}px] object-cover rounded-full`, className)}
        />
    );
}

export default Avatar;
