import type { FC } from "react";
import { Link } from 'atomic-router-react';
import { Button, Card, Space } from 'antd';
import { useForm } from '@effector-reform/react';
import { routing } from '@context/router';
import { $$userRegistrationForm } from '@context/model/auth';
import InputField from '@form/Input';

const Registration: FC = () => {
  const { onSubmit, fields } = useForm($$userRegistrationForm);

  return (
    <div className="flex center items-center mt-content">
      <Card
        title="Регистрация"
        extra={<Link to={routing.auth.login}>Уже зарегистрированы?</Link>}
        style={{ width: 480 }}
      >
        <form onSubmit={onSubmit}>
          <InputField field={fields.name} label="Имя" placeholder="Укажите ваше имя" />
          <InputField field={fields.email} label="Электронная почта" placeholder="Укажите ваш email" />
          <InputField field={fields.password} label="Пароль" placeholder="Придумайте пароль" password />
          <InputField field={fields.passwordCheck} label="Повтор пароля" placeholder="Повторите пароль" password />

          <Space className="mt-8">
            <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
          </Space>
        </form>
      </Card>
    </div>
  );
};

export default Registration;
