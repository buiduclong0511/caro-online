import { cx } from '~/util';
import { Button } from '..';
import Tab from '../Tabs/Tab/Tab';
import Tabs from '../Tabs/Tabs';

function Content() {
    return (
        <div className={cx('p-[20px] flex flex-col h-[100vh]')}>
            <div className={cx('min-h-[70px]')}>
                <Button className={cx('border border-[#ccc]')}>Chơi game</Button>
            </div>
            <div className={cx('flex-1')}>
                <Tabs>
                    <Tab name="Phòng chơi"></Tab>
                    <Tab name="Lịch sử"></Tab>
                    <Tab name="Xếp hạng"></Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default Content;
