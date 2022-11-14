import { useState } from 'react';

import { Button, Input } from '~/components';
import { ArrowSmallRight, EnvelopIcon, LockClosedIcon } from '~/components/icons';
import { cx } from '~/util';

function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div
            className={cx(
                'text-center bg-login-bg bg-no-repeat bg-cover bg-[#2148C0] min-h-screen flex justify-center items-center',
            )}
        >
            <div className={cx('w-[300px]')}>
                <Input label="Email" icon={EnvelopIcon} name="email" />
                <Input label="Password" type="password" icon={LockClosedIcon} name="password" />
                {!isLogin && (
                    <Input label="Confirm password" type="password" icon={LockClosedIcon} name="confirmPassword" />
                )}
                <Button fullWith type="submit">
                    {isLogin ? 'Login' : 'Register'}
                </Button>
                <div className={cx('text-[16px] leading-[20px] mt-[16px] text-white flex justify-between')}>
                    <span className={cx('cursor-pointer')}>Forgot password?</span>
                    <span className={cx('cursor-pointer flex gap-[4px]')} onClick={toggleLogin}>
                        {isLogin ? 'Register' : 'Login'} <ArrowSmallRight className={cx('w-[20px]')} />
                    </span>
                </div>
                <div className={cx('w-full bg-gray-300 h-[1px] my-[24px]')}></div>
                <Button fullWith className={cx('flex items-center justify-center gap-[8px]')}>
                    <img className={cx('w-[16px]')} src="/images/google-logo.png" alt="" />
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
}

export default Login;
