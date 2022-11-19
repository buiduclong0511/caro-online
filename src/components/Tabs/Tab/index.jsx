import { cx } from '~/util';

function Tab({ title = '', children, active = false, hidden = false, ...props }) {
    return (
        <div className={cx('flex-1')} {...props}>
            {children}
        </div>
    );
}

export default Tab;
