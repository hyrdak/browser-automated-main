import { ROUTE_PATHS } from 'constants-es';
import { useAppDispatch } from 'libs/redux';

import { Button, Form, Input, message } from 'antd';

import { useMutationRequestSendEmail } from 'modules/auth/data/queries';

const ForgotPassword = () => {
    const mutationRequestLogin = useMutationRequestSendEmail();

    const handleFinish = ({ email }: any) => {
        mutationRequestLogin.mutate(
            { email },
            {
                onSuccess: (response) => {
                    if (response.success) {
                        message.success(response.message);
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
                        <Input size="large" type="Email" placeholder="Email" />
                    </Form.Item>
                    <Button
                        loading={mutationRequestLogin.isPending}
                        type="primary"
                        className="w-full p-2 mt-5 "
                        htmlType="submit"
                        size="large"
                    >
                        Forgot Password
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

export default ForgotPassword;
