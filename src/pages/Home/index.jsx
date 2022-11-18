import { useDispatch } from 'react-redux';
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
        <h1 className={cx('text-center')}>
            <button onClick={handleSignOut}>Logout</button>
        </h1>
    );
}

export default Home;
