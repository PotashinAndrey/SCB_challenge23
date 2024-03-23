import type { FC } from 'react';
import { Button, Card, Space, Typography } from 'antd';
import { useStore, useUnit } from 'effector-react';
import { useForm } from 'effector-react-form';
import { loginForm, loginFormSubmit, $currentUser, $logInStatus } from '@context/login';

import { InputField } from '@form/input';

const { Text } = Typography;

const Login: FC = () => {
  const { controller } = useForm({ form: loginForm });
  const loginStatus = useStore($logInStatus);

  const user = useUnit($currentUser);

  return (
    <div className="flex center items-center mt-content">
      <Card title="Авторизация" extra={<a href="#/registration">Регистрация</a>} style={{ width: 480 }}>
        <InputField controller={controller({ name: 'login' })} label={'Электронная почта'} />
        <InputField controller={controller({ name: 'password' })} label={'Пароль'} />
        <Space>
          <Button onClick={loginFormSubmit} type="primary" htmlType="submit">
            Войти
          </Button>
          <Text type={loginStatus.status}>{loginStatus.message}</Text>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
