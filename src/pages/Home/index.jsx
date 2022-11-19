import { useDispatch } from 'react-redux';
import { Sidebar } from '~/components';
import Content from '~/components/Content';
import { signOut } from '~/firebase/authentication';
import { clearUser } from '~/redux/slices';
import { cx } from '~/util';

function Home() {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(clearUser());
        signOut();
    };

    return (
        <div className={cx('flex')}>
            <div className={cx('flex-1')}>
                <Content />
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
