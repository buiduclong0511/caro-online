import { memo } from 'react';

import { cx } from '~/util';

function Block({ children = null, selected = false, x, y, onSelect = () => {}, onTick = () => {} }) {
    return (
        <span
            className={cx(
                'w-[36px] h-[36px] flex justify-center items-center text-[30px] border-l border-b border-gray-400 flex-shrink-0 cursor-pointer select-none',
                {
                    'bg-yellow-300': selected,
                    'text-blue-400': children === 'o',
                    'text-red-400': children === 'x',
                },
            )}
            onClick={() => {
                if (!selected) {
                    onSelect([x, y]);
                } else {
                    onTick([x, y]);
                }
            }}
        >
            {children}
        </span>
    );
}

export default memo(Block);
