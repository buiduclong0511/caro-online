import { cx } from '~/util';

function Input({ label = '', icon: Icon, fullWidth = false, error = '', ...props }) {
    return (
        <div
            className={cx('relative border border-solid border-white rounded-[4px] mb-[32px]', {
                'min-w-[300px]': !fullWidth,
                'w-full': fullWidth,
            })}
        >
            {!!Icon && (
                <Icon className={cx('absolute w-[20px] h-[20px] top-1/2 left-[12px] -translate-y-1/2 text-white')} />
            )}
            <input
                {...props}
                className={cx('w-full bg-transparent h-[45px] outline-none border-none text-white', {
                    'pl-[42px]': !!Icon,
                    'pl-[12px]': !Icon,
                })}
                placeholder={label}
            />
            {!!error && <p className={cx('absolute top-full pt-[2px] text-[14px] text-red-600')}>{error}</p>}
        </div>
    );
}

export default Input;
