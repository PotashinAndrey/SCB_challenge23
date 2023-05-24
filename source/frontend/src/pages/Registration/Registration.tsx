import React, { FC } from 'react';
import { useUnit } from "effector-react";
import { Button, Checkbox, Input, Typography } from 'antd';
import { useForm } from 'effector-react-form';

import { registrationForm, registrationFormSubmit, $user } from './model';

import "./Registration.css";
import { InputField } from '../../form/input';
import { useEffect } from 'react';

const {Title} = Typography;

const Registration: FC = () => {
    const { controller, handleSubmit } = useForm({ form: registrationForm });

    const user = useUnit($user);

    useEffect(() => console.log({ user }), [user]);

    return (
        <div className="page-wrap page-registration">
            <div className="section-wrap">
                <Title>Регистрация</Title>

                <InputField controller={controller({ name: "name" })} label={"Имя"} />
                <InputField controller={controller({ name: "login" })} label={"Электронная почта"} />
                <InputField controller={controller({ name: "password" })} label={"Пароль"} />
                <InputField controller={controller({ name: "passwordCheck" })} label={"Повтор пароля"} />

                <Button onClick={registrationFormSubmit} type="primary" htmlType="submit">
                    Зарегистрироваться
                </Button>
            </div>

            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </div>
    );
};

export default Registration;
