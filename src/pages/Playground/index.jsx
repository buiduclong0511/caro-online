import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { historyApi, playgroundApi, roomApi, userApi } from '~/api';
import { Block, Button } from '~/components';
import { PLAYGROUNDS_PATH } from '~/constants';
import db from '~/firebase/realtimeDatabase';
import { board, check, cx } from '~/util';
import Dialog from './Dialog';
import UserInfo from './UserInfo';

function Playground() {
    const rooms = useSelector((state) => state.rooms);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const users = useSelector((state) => state.users);

    const [playground, setPlayground] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState([]);
    const [winPositions, setWinPositions] = useState([]);
    const [ended, setEnded] = useState(false);

    const isListened = useRef(false);
    const isMyTurn = useRef(false);
    const isBlocked = useRef(false);
    const isWin = useRef(false);
    const screen = useRef(null);

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
            if (isMyTurn.current && !isBlocked.current) {
                setSelectedPosition([]);
                playgroundApi.tick(myLabel, position);
            }
        },
        [myLabel],
    );

    const handleSelected = useCallback((position) => {
        if (!isBlocked.current) {
            setSelectedPosition(position);
        }
    }, []);

    const handleClose = async () => {
        await playgroundApi.delete(currentRoom.id);
        await roomApi.delete(currentRoom.id);
    };

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

    useEffect(() => {
        if (playground) {
            if (playground.lastPosition) {
                const xPositions = playground?.board?.x
                    ? Object.values(playground.board.x).map((position) => [
                          Number(position.split(',')[0]),
                          Number(position.split(',')[1]),
                      ])
                    : [];

                const oPositions = playground?.board?.o
                    ? Object.values(playground.board.o).map((position) => [
                          Number(position.split(',')[0]),
                          Number(position.split(',')[1]),
                      ])
                    : [];
                const checkedResult = check(xPositions, oPositions, playground.lastPosition);
                if (checkedResult.result) {
                    setWinPositions(checkedResult.points);
                    isBlocked.current = true;
                    const currentRoom = rooms.find(
                        (room) => room.members.includes(currentUser?.uid) || room.audiences.includes(currentUser?.uid),
                    );
                    if (currentRoom) {
                        const winner = Object.keys(playground.labels).find(
                            (uid) => playground.labels[uid] === checkedResult.label,
                        );
                        historyApi.create({
                            roomId: currentRoom.id,
                            members: currentRoom.members.reduce(
                                (prev, curr) => ({
                                    ...prev,
                                    [curr]: curr,
                                }),
                                {},
                            ),
                            winner,
                        });

                        setEnded(true);
                        isWin.current = winner === currentUser.uid;
                        userApi.updateStats(isWin.current ? 'win' : 'lose');
                    }
                }
            }
        }
    }, [currentUser?.uid, playground, rooms]);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                if (screen.current) {
                    screen.current.scrollTo(
                        screen.current.scrollWidth / 2 - screen.current.offsetWidth / 2,
                        screen.current.scrollHeight / 2 - screen.current.offsetHeight / 2,
                    );
                }
            }, 0);
        }
    }, [loading]);

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
        <div className={cx('flex flex-col w-screen h-screen')}>
            <div
                className={cx(
                    'h-[100px] relative border-b border-b-gray-400 flex justify-between items-center bg-gray-100 px-[16px]',
                )}
            >
                {!!members[0] && (
                    <div className={cx('relative')}>
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
                        <UserInfo
                            data={members[0]}
                            active={playground.labels[members[0].uid] === playground.currentTurn}
                        />
                    </div>
                )}

                <div className={cx('flex flex-col justify-center gap-[8px] h-full')}>
                    <div className={cx('h-[20px] flex justify-center items-center')}>
                        {isMyTurn.current ? 'Your turn!' : ''}
                    </div>
                    <Button className={cx('bg-red-500 text-white')}>Give up</Button>
                </div>

                {!!members[1] && (
                    <div className={cx('relative')}>
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
                        <UserInfo
                            data={members[1]}
                            active={playground.labels[members[1].uid] === playground.currentTurn}
                        />
                    </div>
                )}
            </div>
            <div className={cx('flex-1 overflow-auto')} ref={screen}>
                {board.map((row, index) => (
                    <div key={`row-${index}`} className={cx(`flex flex-nowrap`)}>
                        {row.map((cell, _index) => {
                            const selected = selectedPosition[0] === index && selectedPosition[1] === _index;
                            const isWinPosition = winPositions.some(
                                (position) => position[0] === index && position[1] === _index,
                            );
                            return (
                                <Block
                                    key={`cell-${_index}`}
                                    x={index}
                                    y={_index}
                                    selected={selected}
                                    isWinPosition={isWinPosition}
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
            {ended && <Dialog text={isWin.current ? 'Winner' : 'Loser'} onClick={handleClose} />}
        </div>
    );
}

export default Playground;
