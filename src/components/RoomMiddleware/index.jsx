import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';

import { ROOM_READY, ROOM_STARTING, ROOM_WAITING } from '~/constants';
import { paths } from '~/routes';

function RoomMiddleware({ children }) {
    const rooms = useSelector((state) => state.rooms);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (currentUser && rooms.length) {
            const currentRoom = rooms.find(
                ({ audiences, members }) => audiences.includes(currentUser.uid) || members.includes(currentUser.uid),
            );

            if (currentRoom) {
                if (currentRoom.status === ROOM_STARTING) {
                    navigate(generatePath(paths.playground, { id: currentRoom.id }), { replace: true });
                } else if (currentRoom.status === ROOM_WAITING || currentRoom.status === ROOM_READY) {
                    navigate(generatePath(paths.room, { id: currentRoom.id }), { replace: true });
                }
            }
        } else if (location.pathname.includes('playground') || location.pathname.includes('room')) {
            navigate(paths.home, { replace: true });
        }
    }, [currentUser, location.pathname, navigate, rooms]);

    return children;
}

export default RoomMiddleware;
