import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ROUTE_PATHS } from 'constants-es';
import { useAppDispatch } from 'libs/redux';

import { Button, Form, Input, message } from 'antd';

import { setAuth } from 'helpers/auth';
import { setAuthUser } from 'data/store';
import { useMutationRequestLogin, useMutationRequestUpdatePassword } from 'modules/auth/data/queries';
import { useQueryCheckToken } from 'modules/auth/data/queries/use-query-check-token';

const RecoveryPassword = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const location = useLocation();
    const navigation = useNavigate();

    const mutationRequestUpdatePassword = useMutationRequestUpdatePassword();
    const dispatch = useAppDispatch();
    // const { data, isFetched } = useQueryCheckToken({ token: params.token as string });
    const hash = location.hash;
    const tokenRecovery = new URLSearchParams(hash.slice(1)).get('access_token');

    const handleFinish = ({ email, password }: any) => {
        mutationRequestUpdatePassword.mutate(
            { email, password, token: tokenRecovery as string },
            {
                onSuccess: (response) => {
                    if (response.success) {
                        message.success('Update password success');
                        navigation(ROUTE_PATHS.SIGN_IN);
                    } else {
                        message.error(response.message);
                    }
                },
                onError: (error: any) => {
                    message.error(error.message);
                }
            }
        );
    };

    if (!tokenRecovery) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex-col px-6 bg-white border rounded shadow-md min-w-fit py-14 ">
                    <p>Link is not available or has expired</p>
                    <Button type="primary" className="w-full p-2 mt-5 " href={ROUTE_PATHS.SIGN_IN} size="large">
                        Back to login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex-col px-6 bg-white border rounded shadow-md min-w-fit py-14 ">
                <div className="flex justify-center mb-8">
                    <img className="w-24" src="/logo200x200.png" alt="" />
                </div>
                <Form className="flex flex-col text-sm rounded-md" onFinish={handleFinish}>
                    <Form.Item
                        name={'email'}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input your email!'
                            },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name={'password'}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input size="large" type="password" placeholder="Password" />
                    </Form.Item>
                    <Button
                        loading={mutationRequestUpdatePassword.isPending}
                        type="primary"
                        className="w-full p-2 mt-5 "
                        htmlType="submit"
                        size="large"
                    >
                        Update Password
                    </Button>
                </Form>
                <div className="flex justify-between mt-5 text-sm text-gray-600">
                    <a href={ROUTE_PATHS.SIGN_IN}>Back to sign-in?</a>
                    <a href={ROUTE_PATHS.SIGN_UP}>Sign up</a>
                </div>
                <div className="flex mt-5 text-sm text-center text-gray-400">
                    <p>
                        This site is protected by reCAPTCHA and the Google <br />
                        <a className="underline" href="">
                            Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a className="underline" href="">
                            Terms of Service
                        </a>{' '}
                        apply.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecoveryPassword;
