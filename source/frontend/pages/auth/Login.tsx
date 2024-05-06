import type { FC } from "react";
import { Link } from 'atomic-router-react';
import { Button, Card, Space } from 'antd';
import { useForm } from '@effector-reform/react';
import { routing } from '@context/router';
import { $$userLoginForm } from '@context/model/auth';
import InputField from '@form/Input';

const Login: FC = () => {
  const { onSubmit, fields } = useForm($$userLoginForm);

  return (
    <div className="flex center items-center mt-content">
      <Card
        title="Авторизация"
        extra={<Link to={routing.auth.registration}>Регистрация</Link>}
        style={{ width: 480 }}
      >
        <form onSubmit={onSubmit}>

          <InputField field={fields.login} label="Логин" placeholder="Электронная почта" />
          <InputField field={fields.password} label="Пароль" placeholder="Пароль" password />

          {/* <Text type={loginStatus.status}>{loginStatus.message}</Text> */}

          <Space className="mt-8">
            <Button type="primary" htmlType="submit">Войти</Button>
            <Button type="link" onClick={() => console.log("password forgot")}>Забыли пароль?</Button>
          </Space>
        </form>
      </Card>
    </div>
  );
};

export default Login;
