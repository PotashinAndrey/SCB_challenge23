import type { FC } from 'react';
import { Button, Typography, Card } from 'antd';
import { useUnit } from 'effector-react';
import { useForm } from 'effector-react-form';
import { loginForm, loginFormSubmit, $user } from '@context/login';

import { InputField } from '@form/input';

const Login: FC = () => {
  const { controller } = useForm({ form: loginForm });

  const user = useUnit($user);

  return (
    <div className="flex center items-center mt-content">
      <Card title="Авторизация" extra={<a href="#/registration">Регистрация</a>} style={{ width: 480 }}>
        <InputField
          controller={controller({ name: 'login' })}
          label={'Электронная почта'}
        />
        <InputField controller={controller({ name: 'password' })} label={'Пароль'} />

        <Button onClick={loginFormSubmit} type="primary" htmlType="submit">
          Войти
        </Button>

        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Card>
    </div>
  );
};

export default Login;
