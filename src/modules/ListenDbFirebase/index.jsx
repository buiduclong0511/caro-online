import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROOMS_PATH, USERS_PATH } from '~/constants';
import realtimeDb from '~/firebase/realtimeDatabase';
import { clearUser, setRooms, setUser, setUsers } from '~/redux/slices';
import { paths } from '~/routes';
import { storage } from '~/util';

function ListenDbFirebase() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    const navigate = useNavigate();

    // Listen auth
    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged(
            (user) => {
                if (!user) {
                    navigate(paths.login, { replace: true });
                    return;
                }
                dispatch(
                    setUser({
                        uid: user.uid,
                        email: user.email,
                        photoURL: user.photoURL,
                    }),
                );
            },
            () => {
                storage.clear();
                dispatch(clearUser());
                navigate(paths.login, { replace: true });
            },
        );
    }, [dispatch, navigate]);

    // Listen rooms
    useEffect(() => {
        realtimeDb.onChanged(ROOMS_PATH, (data) => {
            let rooms = [];
            if (data) {
                rooms = Object.entries(data).map(([key, value]) => {
                    const members = Object.keys(value.members)
                        .map((key) => users.find((user) => user.uid === key))
                        .filter((user) => user);
                    return {
                        id: key,
                        ...value,
                        members,
                        master: users.find((user) => user.uid === value.masterUid),
                    };
                });
            }
            dispatch(setRooms(rooms));
        });
    }, [dispatch, users]);

    // Listen users
    useEffect(() => {
        realtimeDb.onChanged(USERS_PATH, (data) => {
            let users = [];
            if (data) {
                users = Object.values(data);
            }

            dispatch(setUsers(users));
        });
    }, [dispatch]);

    return null;
}

export default ListenDbFirebase;
