import { useDispatch } from 'react-redux';
import { createRoom } from '~/redux/slices';
import { cx } from '~/util';

function Home() {
    const dispatch = useDispatch();
    const handleCreateRoom = () => {
        dispatch(createRoom());
    };
    return (
        <h1 className={cx('text-center')}>
            <button onClick={handleCreateRoom}>Create room</button>
        </h1>
    );
}

export default Home;
