import { Button } from '~/components';
import { cx } from '~/util';

function Dialog({ text = '', onClick = () => {} }) {
    return (
        <div className={cx('fixed inset-0 flex justify-center items-center bg-gray-500/50')}>
            <div
                className={cx(
                    'bg-white w-[250px] rounded-[4px] flex flex-col gap-[16px] justify-center items-center py-[18px]',
                )}
            >
                <span>{text}</span>
                <Button className={cx('bg-blue-400 text-white')} onClick={onClick}>
                    Thoát game
                </Button>
            </div>
        </div>
    );
}

export default Dialog;
