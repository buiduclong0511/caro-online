import { cx } from '~/util';

function RoomList({ ...props }) {
    return (
        <table className={cx('w-full mt-[20px]')}>
            <thead>
                <tr>
                    <th className={cx('pb-[8px]')}>STT</th>
                    <th className={cx('pb-[8px]')}>Id</th>
                    <th className={cx('pb-[8px]')}>Chủ phòng</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={cx('text-center')}>1</td>
                    <td className={cx('text-center')}>#1</td>
                    <td className={cx('text-center')}>Duy Nguyen</td>
                </tr>
                <tr>
                    <td className={cx('text-center')}>2</td>
                    <td className={cx('text-center')}>#2</td>
                    <td className={cx('text-center')}>Duy Nguyen</td>
                </tr>
            </tbody>
        </table>
    );
}

export default RoomList;
