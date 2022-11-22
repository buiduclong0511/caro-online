import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { playgroundApi } from '~/api';
import { Block } from '~/components';
import { PLAYGROUNDS_PATH } from '~/constants';
import db from '~/firebase/realtimeDatabase';
import { board, cx } from '~/util';
import UserInfo from './UserInfo';

function Playground() {
    const rooms = useSelector((state) => state.rooms);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const users = useSelector((state) => state.users);

    const [playground, setPlayground] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState([]);

    const isListened = useRef(false);
    const isMyTurn = useRef(false);

    const tickedPositions = useMemo(() => {
        if (!playground || !playground.board) {
            return {};
        }
        const rs = {};
        if (playground.board.x) {
            Object.values(playground.board.x).forEach((position) => (rs[position] = 'x'));
        }
        if (playground.board.o) {
            Object.values(playground.board.o).forEach((position) => (rs[position] = 'o'));
        }
        return rs;
    }, [playground]);

    const myLabel = useMemo(() => {
        if (!playground || !currentUser) {
            return null;
        }

        return playground.labels[currentUser.uid];
    }, [currentUser, playground]);

    const handleTick = useCallback(
        (position) => {
            if (isMyTurn.current) {
                setSelectedPosition([]);
                playgroundApi.tick(myLabel, position);
            }
        },
        [myLabel],
    );

    const handleSelected = useCallback((position) => {
        setSelectedPosition(position);
    }, []);

    useEffect(() => {
        setLoading(true);
        if (currentUser) {
            const currentRoom = rooms.find(
                (room) => room.members.includes(currentUser.uid) || room.audiences.includes(currentUser.uid),
            );
            if (currentRoom && !isListened.current) {
                isListened.current = true;

                db.onChanged(`${PLAYGROUNDS_PATH}/${currentRoom.id}`, (data) => {
                    setLoading(false);
                    setPlayground(data);
                    isMyTurn.current = !data ? false : data.currentTurn === data.labels[currentUser.uid];

                    if (data.lastPosition) {
                        setSelectedPosition(data.lastPosition);
                    }
                });
            }
        }
    }, [currentUser, rooms]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        return null;
    }

    const currentRoom = rooms.find(
        (room) => room.members.includes(currentUser.uid) || room.audiences.includes(currentUser.uid),
    );

    if (!currentRoom || !playground) {
        return null;
    }

    const members = currentRoom.members.map((uid) => users.find((user) => user.uid === uid));

    return (
        <div>
            {!!members[0] && (
                <div className={cx('fixed top-[4px] left-[4px]')}>
                    <span
                        className={cx(
                            'absolute top-[4px] right-[4px] bg-white flex w-[18px] h-[18px] rounded-full justify-center items-center shadow-lg',
                            {
                                'text-red-500': playground.labels[members[0].uid] === 'x',
                            },
                        )}
                    >
                        {playground.labels[members[0].uid]}
                    </span>
                    <UserInfo data={members[0]} active={playground.labels[members[0].uid] === playground.currentTurn} />
                </div>
            )}
            {!!members[1] && (
                <div className={cx('fixed top-[4px] right-[4px]')}>
                    <span
                        className={cx(
                            'absolute top-[4px] left-[4px] bg-white flex w-[18px] h-[18px] rounded-full justify-center items-center shadow-lg',
                            {
                                'text-blue-500': playground.labels[members[1].uid] === 'o',
                            },
                        )}
                    >
                        {playground.labels[members[1].uid]}
                    </span>
                    <UserInfo data={members[1]} active={playground.labels[members[1].uid] === playground.currentTurn} />
                </div>
            )}
            {board.map((row, index) => (
                <div key={`row-${index}`} className={cx(`flex flex-nowrap`)}>
                    {row.map((cell, _index) => {
                        let selected = selectedPosition[0] === index && selectedPosition[1] === _index;
                        return (
                            <Block
                                key={`cell-${_index}`}
                                x={index}
                                y={_index}
                                selected={selected}
                                onSelect={handleSelected}
                                onTick={handleTick}
                            >
                                {tickedPositions[`${index},${_index}`]}
                            </Block>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default Playground;
