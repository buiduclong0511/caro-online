import { cx } from '~/util';

function RoomList({ ...props }) {
    return (
        <table className={cx('w-[100%] mt-[20px] flex flex-col gap-5')}>
            <thead>
                <tr className={cx('flex justify-around')}>
                    <td>STT</td>
                    <td>Id</td>
                    <td>Chủ phòng</td>
                </tr>
            </thead>
            <tbody>
                <tr className={cx('flex justify-around')}>
                    <td>1</td>
                    <td>#1</td>
                    <td>Duy Nguyen</td>
                </tr>
            </tbody>
        </table>
    );
}

export default RoomList;
