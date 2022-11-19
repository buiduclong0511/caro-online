import { cx } from '~/util';

function Tabs({ children }) {
    return <div className={cx('flex justify-around border h-[100%]')}>{children}</div>;
}

export default Tabs;
