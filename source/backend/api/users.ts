import type { UUID } from 'crypto';
import type { FastifyInstance } from 'fastify';
import type { UserLoginModel, UserRegistrationModel, UserModel } from '@app/types/model/user';
import JWT from 'jsonwebtoken'; // TODO: Возможно перейти на @fastify/jwt
import usersService from '../service/users';
import type DB from '../class/DB';

const { sign, verify } = JWT;

const usersApi = (fastify: FastifyInstance, options: { db: DB }, done): void => {
  const { db } = options;
  /** регистрация пользователя */
  fastify.post('/registration', async (request, reply) => {
    try {
      console.log("request.body", request.body);
      const user = request.body as UserRegistrationModel; // JSON.parse(request.body as string) as UserRegistrationModel;
      console.log("user parsed", user);
      const id = await usersService.registration(user, db);
      console.log("user id", id);
      const model: UserModel = {
        name: user.name,
        email: user.email,
        id
      };
      // return model;
      console.log({model})
      reply.code(200);
      reply.send(model);
    } catch (error) {
      console.error(error);
      reply.code(500);
      throw new Error('Ошибка регистрации пользователя!', error);
    }
  });

  /** авторизация пользователя */
  fastify.post('/login', async (request, reply) => {
    console.log('/auth/login', request.body);
    const body = request.body as UserLoginModel; // JSON.parse(request.body as string) as UserLoginModel;
    const results = await usersService.login(body, db);
    const user = results[0];
    console.log("users.login user", user)
    if (user) {
      // const token = sign({ user }, process.env.SECRET);
      // reply.setCookie('authToken', token, { httpOnly: true, path: '/' });
      // reply.send({ ...user, token });
      reply.send(user); //.code(200);
    } else {
      reply.code(401);
      throw new Error('Пользователь не найден!');
    }
  });

  fastify.post('/logout', async (request, reply) => {
    reply.clearCookie('authToken', { httpOnly: true, path: '/' });
    reply.send(true);
    // const authToken = request.cookies.authToken;
    // verify(authToken, process.env.SECRET, async (err, decoded) => {
    //   if (err) {
    //     console.error(err);
    //     reply.code(401);
    //     throw new Error('authtoken is not valide !');
    //   }

    //   const id = (decoded as { user: UserModel })?.user?.id;
    //   const results = await usersService.logout(id, db);
    //   const user = results[0];
    //   console.log("TOKEN");
    //   console.group();
    //   console.log(decoded, id, user);

    //   if (user) {
    //     reply.setCookie('authToken', "", { httpOnly: true, path: '/' });
    //   } else {
    //     reply.code(401);
    //     throw new Error('authtoken is not valide !');
    //   }

    //});//TODO калбек для ошибки
  });

  //This is a protected route
  fastify.post('/about', (request, reply) => {
    const { id } = request.body as { id: UUID };
    console.log("users.about: id", id);
    reply.send({ id });

  //   // format: 'BEARER token'
  //   const authToken = request.cookies.authToken;

  //   // verify the JWT token generated for the user
  //   verify(authToken, process.env.SECRET, (err, user) => {
  //     if (err) {
  //       // If error send Forbidden (403)
  //       console.log('ERROR: Could not connect to the protected route');
  //       reply.status(403);
  //     } else {
  //       // If token is successfully verified, we can send the autorized data
  //       reply.send({ ...(user as object) });
  //       console.log('SUCCESS: Connected to protected route');
  //     }
  //   });
  });

  done();
};

export default usersApi;
