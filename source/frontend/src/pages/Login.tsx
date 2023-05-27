import type { FC } from 'react';
import { useEffect } from 'react';
import { Button, Checkbox, Input, Typography } from 'antd';
import { useUnit } from "effector-react";
import { useForm } from 'effector-react-form';

import { loginForm, loginFormSubmit, $user } from '../context/login';

import "../style/Login.css";
import { InputField } from '../form/input';

const { Title } = Typography;

const Login: FC = () => {
  const { controller, handleSubmit } = useForm({ form: loginForm });

  const user = useUnit($user);

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
