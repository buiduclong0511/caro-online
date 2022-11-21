import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { roomApi } from '~/api';
import { paths } from '~/routes';

import { cx } from '~/util';
import UserInfo from './UserInfo';

function Room() {
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.auth.currentUser);
    const rooms = useSelector((state) => state.rooms);
    const users = useSelector((state) => state.users);
    const param = useParams();

    const currentRoom = rooms.find((room) => room.id === param.id);

    if (!currentRoom) return null;

    const masterUid = currentRoom.masterUid;
    const members = currentRoom.members.map((uid) => users.find((user) => user.uid === uid));

    const handleLeave = () => {
        roomApi.leave().then(() => navigate(paths.home, { replace: true }));
    };

    const handleStart = () => {
        roomApi.start();
    };

    return (
        <div className={cx('flex flex-col w-screen h-screen bg-room-bg bg-50%')}>
            <div className={cx('relative flex justify-around items-center flex-1')}>
                <div
                    className={cx(
                        'absolute top-[10px] bg-white shadow-lg w-[300px] rounded-[8px] flex flex-col gap-[16px] items-center justify-between px-[16px] py-[16px]',
                    )}
                >
                    <p className={cx('w-full text-center')}>{currentRoom.status}</p>
                    <div className={cx(`flex justify-around w-full`)}>
                        <button
                            className={cx('bg-red-500 text-white py-[4px] px-[16px] rounded-[4px] shadow-lg')}
                            onClick={handleLeave}
                        >
                            Leave
                        </button>
                        {currentUser.uid === masterUid && (
                            <button
                                className={cx(`bg-blue-500 text-white py-[4px] px-[16px] rounded-[4px] shadow-lg`, {
                                    'opacity-50': members.length < 2,
                                })}
                                disabled={members.length < 2}
                                onClick={handleStart}
                            >
                                Start
                            </button>
                        )}
                    </div>
                </div>
                <div className={cx('flex-1 flex justify-center')}>
                    <UserInfo data={members[0]} isMaster={!!members[0] && members[0].uid === masterUid} />
                </div>
                <div>
                    <img src="/images/versus.png" alt="versus" className={cx('w-[200px] h-[120px]')} />
                </div>
                <div className={cx('flex-1 flex justify-center')}>
                    <UserInfo data={members[1]} isMaster={!!members[1] && members[1].uid === masterUid} />
                </div>
            </div>
            <div className={cx('h-[30vh]')}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Room;
