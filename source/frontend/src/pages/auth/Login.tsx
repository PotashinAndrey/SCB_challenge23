import type { FC, SyntheticEvent } from "react";
import { useCallback } from "react";
import { Link } from 'atomic-router-react';
import { Button, Card, Space } from 'antd';
import { useForm } from '@filledout/react';
import { routing } from '@context/router';
import { $$userLoginForm } from '@context/auth';
import InputField from '@form/Input';
import { preventDefault } from "../../scripts/ui-utils";

const Login: FC = () => {
  const { onSubmit, fields } = useForm($$userLoginForm);

  const submit = useCallback(<T extends SyntheticEvent<E>, E>(event: T) => {
    preventDefault(event);
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex center items-center mt-content">
      <Card
        title="Авторизация"
        extra={<Link to={routing.auth.registration}>Регистрация</Link>}
        style={{ width: 480 }}
      >
        <form onSubmit={submit}>

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
