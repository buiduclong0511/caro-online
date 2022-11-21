import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';

import { ROOM_WAITING } from '~/constants';
import { paths } from '~/routes';

function RoomMiddleware({ children }) {
    const rooms = useSelector((state) => state.rooms);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser && rooms.length) {
            const currentRoom = rooms.find(
                ({ audiences, members }) => audiences.includes(currentUser.uid) || members.includes(currentUser.uid),
            );

            if (currentRoom) {
                if (currentRoom.status === ROOM_WAITING) {
                    navigate(generatePath(paths.room, { id: currentRoom.id }), { replace: true });
                }
            }
        }
    }, [currentUser, navigate, rooms]);

    return children;
}

export default RoomMiddleware;
