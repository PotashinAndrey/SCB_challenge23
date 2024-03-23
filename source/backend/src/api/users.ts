import type { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import type { UserLoginModel, UserRegistrationModel } from '@app/types/model/user';
import type DB from '../../class/DB';
import usersService from '../service/users';
// TODO Возможно перейти на @fastify/jwt
import JWT from 'jsonwebtoken';

const { sign, verify } = JWT;

const usersApi = (fastify: FastifyInstance, options: { db: DB }, done): void => {
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
      const token = sign({ user }, process.env.SECRET);
      reply.setCookie('authToken', token, { httpOnly: true, path: '/' });
      reply.send({ token });
    } else {
      reply.code(401);
      throw new Error('Пользователь не найден!');
    }
  });

  //This is a protected route
  fastify.post('/userInfo', (request, reply) => {
    // format: 'BEARER token'
    const authToken = request.cookies.authToken;

    // verify the JWT token generated for the user
    verify(authToken, process.env.SECRET, (err, user) => {
      if (err) {
        // If error send Forbidden (403)
        console.log('ERROR: Could not connect to the protected route');
        reply.status(403);
      } else {
        // If token is successfully verified, we can send the autorized data
        reply.send({ ...(user as object) });
        console.log('SUCCESS: Connected to protected route');
      }
    });
  });

  done();
};

export default usersApi;
