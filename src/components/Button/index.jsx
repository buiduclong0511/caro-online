import { cx } from '~/util';

function Button({ children, fullWith = false, className, ...props }) {
    return (
        <button
            className={cx(
                'bg-white uppercase px-[32px] h-[40px] rounded-[4px] hover:shadow-lg transition-[300ms]',
                className,
                {
                    'w-full': fullWith,
                    'bg-gray-300': props.disabled,
                    'text-gray-400': props.disabled,
                    'cursor-not-allowed': props.disabled,
                },
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
