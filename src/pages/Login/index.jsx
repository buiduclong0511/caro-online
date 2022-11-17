import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { Button, Input } from '~/components';
import { ArrowSmallRight, EnvelopIcon, LockClosedIcon } from '~/components/icons';
import { signUpWithEmail } from '~/firebase/authentication';
import { cx } from '~/util';

const REGEX_EMAIL = /^\s*[a-zA-Z0-9.]+@\w+(\.\w+)+\s*$/g;

function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin = () => {
        setIsLogin(!isLogin);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .matches(REGEX_EMAIL, 'Email không hợp lệ')
                .max(50, 'Tối đa 50 ký tự')
                .required('Vui lòng nhập email của bạn'),
            password: Yup.string().min(8, 'Mật khẩu ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            signUpWithEmail(values.email, values.password);
        },
    });

    return (
        <div
            className={cx(
                'text-center bg-login-bg bg-no-repeat bg-cover bg-[#2148C0] min-h-screen flex justify-center items-center',
            )}
        >
            <form className={cx('w-[300px]')} onSubmit={formik.handleSubmit}>
                <Input
                    label="Email"
                    icon={EnvelopIcon}
                    name="email"
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <Input
                    label="Password"
                    type="password"
                    icon={LockClosedIcon}
                    name="password"
                    value={formik.values.password}
                    error={formik.touched.password && formik.errors.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {!isLogin && (
                    <Input
                        label="Confirm password"
                        type="password"
                        icon={LockClosedIcon}
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                )}
                <Button fullWith type="submit" disabled={formik.isSubmitting}>
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
            </form>
        </div>
    );
}

export default Login;
