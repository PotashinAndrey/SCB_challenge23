import type { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import type { UserLoginModel, UserRegistrationModel } from '@app/types/model/user';
import type DB from '../../class/DB';
import usersService from '../service/users';

const usersApi = (
  fastify: FastifyInstance,
  options: { db: DB },
  done: () => void
): void => {
  const { db } = options;

  /** регистрация пользователя */
  fastify.post('/registration', async (request, reply) => {
    try {
      const user = JSON.parse(request.body as string) as UserRegistrationModel;
      const id = await usersService.registration(user, db);
      return { ...user, id };
    } catch (error) {
      //
    }
  });

  /** авторизация пользователя */
  fastify.post('/login', async (request, reply) => {
    console.log('/login', request.body);
    const user = JSON.parse(request.body as string) as UserLoginModel;
    const id = await usersService.login(user, db);
    return { ...id[0] };
  });

  done();
};

export default usersApi;
