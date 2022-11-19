import Avatar from '~/components/Avatar';
import { cx } from '~/util';

function UserInfo({ data, masterUid }) {
    if (!data) {
        return (
            <button
                className={cx(
                    'w-[150px] h-[150px] pb-[8px]  rounded-full bg-white border shadow-lg text-[80px] text-gray-600',
                )}
            >
                +
            </button>
        );
    }

    return (
        <div className={cx('p-[12px] bg-white border rounded-[12px] shadow-lg relative')}>
            <Avatar size={250} className={cx('rounded-[8px]')} />
            {data.uid === masterUid && (
                <div className={cx('bg-[rgba(0,0,0,0.3)] p-[6px] rounded-lg absolute right-[20px] top-[20px]')}>
                    <img className={cx('w-[20px] ')} src="/images/crown_icon.svg" alt="crown" />
                </div>
            )}
            <h3 className={cx('text-center py-[20px]')}>{data ? data.email : ''}</h3>
        </div>
    );
}

export default UserInfo;
