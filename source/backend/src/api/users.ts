import type { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import type { UserLoginModel, UserRegistrationModel } from '@app/types/model/user';
import type DB from '../../class/DB';
import usersService from '../service/users';
import JWT from 'jsonwebtoken';

const { sign, verify } = JWT;

const usersApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
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
    const body = JSON.parse(request.body as string) as UserLoginModel;
    const results = await usersService.login(body, db);
    const user = results[0];
    console.log('Login user: ', user);
    if (user) {
      const token = sign({ user }, 'privatekey');
      reply.setCookie('Authorization', token, { httpOnly: true, path: '/' });
      reply.send({ token });
    } else {
      reply.code(401).send({ message: 'Пользователь не найден!' });
    }
  });

  //This is a protected route
  fastify.get('/user/data', (request, reply) => {
    // format: 'BEARER token'
    const authHeader = request.headers['authorization'];

    // TODO Надо в хук вынести логику валидации токена для протектед роутов
    let token: string;
    if (authHeader) {
      token = authHeader.split(' ')[1];
    } else {
      reply.status(403);
    }

    // verify the JWT token generated for the user
    verify(token, 'privatekey', (err, user) => {
      if (err) {
        // If error send Forbidden (403)
        console.log('ERROR: Could not connect to the protected route');
        reply.status(403);
      } else {
        // If token is successfully verified, we can send the autorized data
        reply.send({
          message: 'Successful log in',
          user
        });
        console.log('SUCCESS: Connected to protected route');
      }
    });
  });

  done();
};

export default usersApi;
