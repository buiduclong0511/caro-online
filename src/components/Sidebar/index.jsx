import { cx } from '~/util';
import { AddFriend } from '../icons';

function Sidebar() {
    return (
        <div className={cx('flex flex-col flex-1')}>
            <div className={cx('h-[140px] flex gap-3 border-[2px] p-[8px] rounded-lg')}>
                <div className={cx('flex flex-col justify-center gap-1')}>
                    <img
                        src="/images/avatar.png"
                        alt=""
                        className={cx('w-[70px] h-[70px] object-cover rounded-full')}
                    />
                    <span className={cx('text-level-color px-6 rounded-lg border border-level-border text-center')}>
                        1
                    </span>
                </div>
                <p className={cx('text-md flex items-center h-[70px]')}>Rosie</p>
            </div>
            <div className={cx('h-[100%] mt-3 flex flex-col flex-1 gap-3 border-[2px] p-[8px] rounded-lg')}>
                <div className={cx('flex justify-between w-[100%] h-[30px]')}>
                    <h3 className={cx('text-[16px] uppercase')}>Hành động</h3>
                    <button>
                        <AddFriend className={cx('w-[16px]')} />
                    </button>
                </div>
                <div className={cx('flex justify-between pr-2')}>
                    <h3>Lời mời kết bạn</h3>
                    <span>2</span>
                </div>
                <div>
                    <h3>Bạn bè (online):</h3>
                    <ul className={cx('pl-4')}>
                        <li>Đức Long</li>
                        <li>Anh Tuấn</li>
                    </ul>
                </div>
                <div>
                    <h3>Bạn bè (offline):</h3>
                    <ul className={cx('pl-4')}>
                        <li>Tân Đặng</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
