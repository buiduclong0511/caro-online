import Avatar from '~/components/Avatar';
import { cx } from '~/util';

function UserInfo({ data, isMaster = false }) {
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
        <div className={cx('p-[12px] bg-white border rounded-[12px] shadow-lg flex w-[300px] h-[110px]')}>
            <div className={cx('relative flex items-center w-[80px]')}>
                <Avatar size={80} src={data.photoURL} alt={data.email} className={cx('rounded-[8px]')} />
                {isMaster && (
                    <div
                        className={cx(
                            'absolute top-[-8px] left-[-8px] bg-white p-[4px] rounded-full shadow-lg border border-gray-100',
                        )}
                    >
                        <img className={cx('w-[15px]')} src="/images/crown_icon.svg" alt="crown" />
                    </div>
                )}
            </div>
            <div className={cx('flex flex-col px-[8px] justify-center flex-1')}>
                <h3 className={cx('max-w-[178px] text-ellipsis whitespace-nowrap overflow-hidden')}>{data.email}</h3>
                <p className={cx('')}>Scores: {data.scores}</p>
                <p className={cx('')}>
                    <span className={cx('text-green-500')}>{data.win}</span>/
                    <span className={cx('text-red-500')}>{data.lose}</span>
                </p>
            </div>
        </div>
    );
}

export default UserInfo;
