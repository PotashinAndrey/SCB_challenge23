import React, { FC } from 'react';
import { useUnit } from "effector-react";
import { Button, Checkbox, Input, Typography } from 'antd';
import { useForm } from 'effector-react-form';

import { loginForm, loginFormSubmit, $user } from './model';

import "./Login.css";
import { InputField } from '../../form/input';
import { useEffect } from 'react';

const {Title} = Typography;

const Login: FC = () => {
    const { controller, handleSubmit } = useForm({ form: loginForm });

    const user = useUnit($user);

    useEffect(() => console.log({ user }), [user]);

    return (
        <div className="page-wrap page-login">
            <div className="section-wrap">
                <Title>Авторизация</Title>

                <InputField controller={controller({ name: "login" })} label={"Электронная почта"} />
                <InputField controller={controller({ name: "password" })} label={"Пароль"} />

                <Button onClick={loginFormSubmit} type="primary" htmlType="submit">
                    Войти
                </Button>
            </div>

            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </div>
    );
};

export default Login;