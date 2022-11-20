import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cx } from '~/util';
import UserInfo from './UserInfo';

function Room() {
    const rooms = useSelector((state) => state.rooms);
    const users = useSelector((state) => state.users);
    const param = useParams();

    const currentRoom = rooms.find((room) => room.id === param.id);
    if (!currentRoom) return null;

    const masterUid = currentRoom.masterUid;
    // const masterRoom = users.find((user) => user.uid === masterUid);

    const members = currentRoom.members.map((uid) => users.find((user) => user.uid === uid));

    return (
        <div className={cx('flex flex-col w-screen h-screen bg-room-bg bg-50%')}>
            <div className={cx('flex justify-around items-center flex-1')}>
                <UserInfo data={members[0]} masterUid={masterUid} />
                <div>
                    <img src="/images/versus.png" alt="versus" className={cx('w-[200px] h-[120px]')} />
                </div>
                <UserInfo data={members[1]} masterUid={masterUid} />
            </div>
            <div className={cx('h-[30vh]')}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Room;
