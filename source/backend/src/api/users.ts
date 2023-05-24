import type { FastifyInstance, FastifyRegisterOptions } from "fastify";

const usersApi = (fastify: FastifyInstance, opts: FastifyRegisterOptions<{}>, done: () => void): void => {

  /** регистрация пользователя */
  fastify.post("/register", async (request, reply) => {
    console.log("/login", request.body);
    return request.body;
  });

  /** авторизация пользователя */
  fastify.post("/login", (request, reply) => {
    console.log("/login", request.body);
    return request.body;
  });

  done();
}

export default usersApi;
