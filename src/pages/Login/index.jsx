import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Button, Input } from '~/components';
import { ArrowSmallRight, EnvelopIcon, LockClosedIcon } from '~/components/icons';
import { ENTER_KEY } from '~/constants';
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '~/firebase/authentication';
import { cx, handleFirebaseError } from '~/util';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required').email('Email is invalid'),
            password: Yup.string().required('Password is required').min(8, 'At least 8 characters'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password not matched'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                if (isLogin) {
                    await signInWithEmail(values.email, values.password);
                } else {
                    await signUpWithEmail(values.email, values.password);
                }
                navigate('/', { replace: true });
            } catch (err) {
                handleFirebaseError(err);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handlePressEnter = (e) => {
        if (e.keyCode === ENTER_KEY) {
            formik.handleSubmit();
        }
    };

    const toggleLogin = () => {
        setIsLogin(!isLogin);
        formik.resetForm();
    };

    const handleLoginWithGoogle = async () => {
        try {
            await signInWithGoogle();
            navigate('/', { replace: true });
        } catch (err) {
            handleFirebaseError(err);
        }
    };

    return (
        <div
            className={cx(
                'text-center bg-login-bg bg-no-repeat bg-cover bg-[#2148C0] min-h-screen flex justify-center items-center',
            )}
        >
            <div className={cx('w-[300px]')}>
                <Input
                    label="Email"
                    icon={EnvelopIcon}
                    name="email"
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={handlePressEnter}
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
                    onKeyDown={handlePressEnter}
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
                        onKeyDown={handlePressEnter}
                    />
                )}
                <Button type="button" fullWith disabled={formik.isSubmitting} onClick={formik.handleSubmit}>
                    {isLogin ? 'Login' : 'Register'}
                </Button>
                <div className={cx('text-[16px] leading-[20px] mt-[16px] text-white flex justify-between')}>
                    <span className={cx('cursor-pointer')}>Forgot password?</span>
                    <span className={cx('cursor-pointer flex gap-[4px]')} onClick={toggleLogin}>
                        {isLogin ? 'Register' : 'Login'} <ArrowSmallRight className={cx('w-[20px]')} />
                    </span>
                </div>
                <div className={cx('w-full bg-gray-300 h-[1px] my-[24px]')}></div>
                <Button
                    fullWith
                    className={cx('flex items-center justify-center gap-[8px]')}
                    onClick={handleLoginWithGoogle}
                >
                    <img className={cx('w-[16px]')} src="/images/google-logo.png" alt="" />
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
}

export default Login;
