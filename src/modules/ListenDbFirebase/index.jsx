import { getAuth } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FRIENDS_PATH, ROOMS_PATH, USERS_PATH } from '~/constants';

import db from '~/firebase/realtimeDatabase';
import { clearUser, setInvitedFriends, setInvitingFriends, setRooms, setUser, setUsers } from '~/redux/slices';
import { paths } from '~/routes';
import { storage } from '~/util';

function ListenDbFirebase() {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.currentUser);
    const users = useSelector((state) => state.users);

    const navigate = useNavigate();

    const dispatchRef = useRef(dispatch);
    const navigateRef = useRef(navigate);

    const isListenedInvitingFriends = useRef(false);
    const isListenedInvitedFriends = useRef(false);
    const isMarkedOnline = useRef(false);

    // Listen auth
    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged(
            async (user) => {
                if (!user) {
                    navigateRef.current(paths.login, { replace: true });
                    dispatchRef.current(clearUser());
                    return;
                }
                dispatchRef.current(
                    setUser({
                        uid: user.uid,
                        email: user.email,
                        photoURL: user.photoURL,
                    }),
                );
            },
            () => {
                storage.clear();
                dispatchRef.current(clearUser());
                navigateRef.current(paths.login, { replace: true });
            },
        );
    }, []);

    // Listen rooms
    useEffect(() => {
        db.onChanged(ROOMS_PATH, (data) => {
            let rooms = [];
            if (data) {
                rooms = Object.entries(data).map(([key, value]) => {
                    const members = Object.keys(value.members);
                    const audiences = Object.keys(value.audiences || {});
                    return {
                        id: key,
                        ...value,
                        members,
                        audiences,
                    };
                });
            }
            dispatchRef.current(setRooms(rooms));
        });
    }, []);

    // Listen users
    useEffect(() => {
        db.onChanged(USERS_PATH, (data) => {
            let users = [];
            if (data) {
                const usersData = Object.values(data);
                users = usersData.map((userData) => ({
                    uid: userData.uid || '',
                    email: userData.email || '',
                    photoURL: userData.photoURL || '',
                    scores: userData.scores || 0,
                    online: !!userData.online,
                    exp: userData.exp || 0,
                    level: userData.level || 1,
                }));
            }

            dispatchRef.current(setUsers(users));
        });
    }, []);

    // Listen inviting friends
    useEffect(() => {
        if (currentUser && !isListenedInvitingFriends.current) {
            isListenedInvitingFriends.current = true;

            db.onChanged(`${FRIENDS_PATH}/${currentUser.uid}/inviting`, (data) => {
                let invitingFriends = [];
                if (data) {
                    invitingFriends = Object.keys(data);
                }
                dispatchRef.current(setInvitingFriends(invitingFriends));
            });
        }
    }, [currentUser]);

    // Listen invited friends
    useEffect(() => {
        if (currentUser && !isListenedInvitedFriends.current) {
            isListenedInvitedFriends.current = true;

            db.onChanged(`${FRIENDS_PATH}/${currentUser.uid}/invited`, (data) => {
                let invitedFriends = [];
                if (data) {
                    invitedFriends = Object.keys(data);
                }
                dispatchRef.current(setInvitedFriends(invitedFriends));
            });
        }
    }, [currentUser]);

    // Mark online
    useEffect(() => {
        if (currentUser && users.length && !isMarkedOnline.current) {
            isMarkedOnline.current = true;
            const _currentUser = users.find((user) => user.uid === currentUser.uid);
            if (_currentUser && !_currentUser.online) {
                db.update(`${USERS_PATH}/${_currentUser.uid}/online`, true);
            }
        }
    }, [currentUser, users]);

    // Mark offline
    useEffect(() => {
        const handle = () => {
            if (currentUser) {
                const _currentUser = users.find((user) => user.uid === currentUser.uid);
                if (_currentUser) {
                    db.update(`${USERS_PATH}/${_currentUser.uid}/online`, false);
                }
            }
        };

        window.addEventListener('beforeunload', handle);

        return () => window.removeEventListener('beforeunload', handle);
    }, [currentUser, users]);

    return null;
}

export default ListenDbFirebase;
