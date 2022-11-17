import { signOut } from '~/firebase/authentication';
import { cx } from '~/util';

function Home() {
    return (
        <h1 className={cx('text-center')}>
            <button onClick={signOut}>Logout</button>
        </h1>
    );
}

export default Home;
