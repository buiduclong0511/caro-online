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
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(clearUser());
        signOut();
    };

    const handleCreateRoom = () => {
        roomApi.create();
    };

    return (
        <div className={cx('flex')}>
            <div className={cx('flex-1')}>
                <div className={cx('p-[20px] flex flex-col h-[100vh] bg-[#f5f5f5]')}>
                    <div className={cx('min-h-[70px]')}>
                        <Button className={cx('border border-[#ccc]')} onClick={handleCreateRoom}>
                            Chơi game
                        </Button>
                    </div>
                    <div className={cx('flex-1 bg-[white] rounded-b-[10px]')}>
                        <Tabs className={cx('')}>
                            <Tab title="Phòng chơi">
                                <RoomList />
                            </Tab>
                            <Tab title="Lịch sử">
                                <div>Tab 2</div>
                            </Tab>
                            <Tab title="Xếp hạng">
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
        </div>
    );
}

export default Home;
