import type { FC, SyntheticEvent } from "react";
import { useCallback } from "react";
import { Link } from 'atomic-router-react';
import { Button, Card, Space } from 'antd';
import { useForm } from '@filledout/react';
import { routing } from '@context/router';
import { $$userRegistrationForm } from '@context/auth';
import InputField from '@form/Input';
import { preventDefault } from "../../scripts/ui-utils";

const Registration: FC = () => {
  const { onSubmit, fields } = useForm($$userRegistrationForm);

  const submit = useCallback(<T extends SyntheticEvent<E>, E>(event: T) => {
    preventDefault(event);
    console.log('submit', { fields });
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex center items-center mt-content">
      <Card
        title="Регистрация"
        extra={<Link to={routing.auth.login}>Уже зарегистрированы?</Link>}
        style={{ width: 480 }}
      >
        <form onSubmit={submit}>
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
