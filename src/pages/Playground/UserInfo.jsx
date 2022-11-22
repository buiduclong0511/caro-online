import Avatar from '~/components/Avatar';
import { cx } from '~/util';

function UserInfo({ data, active = false }) {
    return (
        <div
            className={cx(' p-[12px] rounded-[8px] shadow-lg', {
                'bg-yellow-300': active,
                'bg-white': !active,
            })}
        >
            <Avatar src={data.photoURL} alt={data.email} className={cx(`rounded-[4px]`)} />
        </div>
    );
}

export default UserInfo;
