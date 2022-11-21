import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { roomApi } from '~/api';
import { Button, Sidebar } from '~/components';
import RoomList from '~/components/RoomList';
import Tabs from '~/components/Tabs';
import Tab from '~/components/Tabs/Tab';
import { signOut } from '~/firebase/authentication';
import { clearUser } from '~/redux/slices';
import { cx } from '~/util';

function Home() {
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [roomId, setRoomId] = useState('');

    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(clearUser());
        signOut();
    };

    const handleCreateRoom = () => {
        roomApi.create();
    };

    const handleShowJoinModal = () => {
        setShowJoinModal(true);
    };

    const handleHideJoinModal = () => {
        setShowJoinModal(false);
    };

    const handleJoinRoom = (id) => {
        roomApi.join(id);
    };

    const handleClickJoinBtn = () => {
        handleJoinRoom(roomId);
    };

    return (
        <div className={cx('flex')}>
            <div className={cx('flex-1')}>
                <div className={cx('p-[20px] flex flex-col h-[100vh] bg-[#f5f5f5]')}>
                    <div className={cx('min-h-[70px] flex gap-[16px]')}>
                        <Button className={cx('border border-[#ccc]')} onClick={handleCreateRoom}>
                            Create Room
                        </Button>
                        <Button className={cx('border border-[#ccc]')} onClick={handleShowJoinModal}>
                            Join Room
                        </Button>
                    </div>
                    <div className={cx('flex-1 bg-[white] rounded-b-[10px]')}>
                        <Tabs className={cx('')}>
                            <Tab title="Rooms">
                                <RoomList />
                            </Tab>
                            <Tab title="Histories">
                                <div>Tab 2</div>
                            </Tab>
                            <Tab title="Rank">
                                <div>Tab 3</div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <div className={cx('w-sidebar p-[20px] flex justify-between flex-col h-[100vh] border-l-[2px]')}>
                <Sidebar />
                <h1 className={cx('text-center')}>
                    <button onClick={handleSignOut}>Logout</button>
                </h1>
            </div>
            {showJoinModal && (
                <div className={cx(`fixed inset-0 flex justify-center items-center bg-gray-400/50`)}>
                    <div className={cx(`w-[350px] p-[16px] bg-white rounded-[4px]`)}>
                        <h3 className={cx(`text-center mb-[16px]`)}>JOIN ROOM</h3>
                        <div className={cx(`flex items-center gap-[4px] mb-[16px]`)}>
                            <label htmlFor="">ID: </label>
                            <input
                                type="text"
                                autoFocus
                                className={cx(`flex-1 border rounded-[4px] outline-none px-[8px] py-[4px]`)}
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value.trim())}
                            />
                        </div>
                        <div className={cx(`flex justify-end gap-[8px]`)}>
                            <button
                                className={cx(`border rounded-[4px] px-[16px] py-[4px]`)}
                                onClick={handleHideJoinModal}
                            >
                                Cancel
                            </button>
                            <button
                                className={cx(`border rounded-[4px] bg-blue-500 text-white px-[16px] py-[4px]`, {
                                    'opacity-50': !roomId.trim(),
                                })}
                                disabled={!roomId.trim()}
                                onClick={handleClickJoinBtn}
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
