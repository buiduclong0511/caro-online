import React, { useState } from 'react';
import { cx } from '~/util';

function Tabs({ children, defaultActive = 0 }) {
    const [activeIndex, setActiveIndex] = useState(defaultActive);
    const tabs = React.Children.toArray(children);

    return (
        <div>
            <div className={cx('flex justify-around h-[50px] bg-[#f5f5f5]')}>
                {tabs.map((tab, index) => (
                    <button
                        key={`tab-${index}`}
                        onClick={() => setActiveIndex(index)}
                        className={cx('w-[100%] text-center transition-[300ms] font-semibold', {
                            'text-tab-active-color': activeIndex === index,
                            'bg-[#fff]': activeIndex === index,
                            'rounded-t-[10px]': activeIndex === index,
                        })}
                    >
                        {tab.props.title}
                    </button>
                ))}
            </div>
            <div>{tabs[activeIndex].props.children}</div>
        </div>
    );
}

export default Tabs;
