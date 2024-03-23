import type { FC } from 'react';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { Button, Checkbox, Input, Typography, Card } from 'antd';
import { useForm } from 'effector-react-form';

import { registrationForm, registrationFormSubmit, $user } from '@context/registration';

import { InputField } from '../form/input';

const { Title } = Typography;

const Registration: FC = () => {
  const { controller, handleSubmit } = useForm({ form: registrationForm });

  const user = useUnit($user);

  useEffect(() => console.log({ user }), [user]);

  return (
    <div className="flex center items-center mt-content">
      <Card title="Регистрация" extra={<a href="#/login">Уже зарегистрированы?</a>} style={{ width: 480 }}>
        <InputField controller={controller({ name: 'name' })} label={'Имя'} />
        <InputField controller={controller({ name: 'email' })} label={'Электронная почта'} />
        <InputField controller={controller({ name: 'password' })} label={'Пароль'} />
        <InputField controller={controller({ name: 'passwordCheck' })} label={'Повтор пароля'} />

        <Button onClick={registrationFormSubmit} type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
        <Button type="link">Забыли пароль?</Button>
      </Card>
    </div>
  );
};

export default Registration;
