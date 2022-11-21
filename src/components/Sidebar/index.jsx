import { useSelector } from 'react-redux';
import { cx } from '~/util';
import Avatar from '../Avatar';
import { AddFriendIcon } from '../icons';

function Sidebar() {
    const uid = useSelector((state) => state.auth.currentUser)?.uid;
    const users = useSelector((state) => state.users);

    const currentUser = users.find((user) => user.uid === uid);

    return (
        <div className={cx('flex flex-col flex-1')}>
            <div className={cx('h-[140px] border-[2px] p-[8px] rounded-lg')}>
                <div className={cx('flex items-center gap-[8px]')}>
                    <div className={cx(`relative`)}>
                        <Avatar size={70} src={currentUser?.photoURL} alt={currentUser?.email} />
                        <span
                            className={cx(
                                'absolute left-1/2 -translate-x-1/2 mt-[4px] text-level-color px-6 rounded-lg border border-level-border text-center',
                            )}
                        >
                            {currentUser?.level}
                        </span>
                    </div>
                    <h3 className={cx('text-md w-[150px] text-ellipsis overflow-hidden')}>{currentUser?.email}</h3>
                </div>
            </div>
            <div className={cx('h-[100%] mt-3 flex flex-col flex-1 gap-3 border-[2px] p-[8px] rounded-lg')}>
                <div className={cx('flex justify-between w-[100%] h-[30px]')}>
                    <h3 className={cx('text-[16px] uppercase font-bold')}>Friends</h3>
                    <button>
                        <AddFriendIcon className={cx('w-[16px]')} />
                    </button>
                </div>
                <div className={cx('flex justify-between pr-2')}>
                    <h3>Friend request</h3>
                    <span>2</span>
                </div>
                <div>
                    <h3>My friend (online):</h3>
                    <ul className={cx('pl-4')}>
                        <li>Đức Long</li>
                        <li>Anh Tuấn</li>
                    </ul>
                </div>
                <div>
                    <h3>My friend (offline):</h3>
                    <ul className={cx('pl-4')}>
                        <li>Tân Đặng</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
