import type { FastifyError } from 'fastify';
import type { ServerProtocol } from '@app/types/config';
import { routing } from '@context/router';

declare const __API_PORT__: number;

const handleError = (error: FastifyError) => {
  switch (error.statusCode) {
    case 401:
      // Redirect to login page
      routing.auth.login.open();
      break;
    case 403:
      // Redirect to forbidden page
      routing.forbidden.open();
      break;
    default:
      break;
  }
};

/** Запрос к API
  * @example api<Response, Request>(method: string, request?: Request): Promise<Response>
  * @generic Response - Тип ответа
  * @generic Request - Тип запроса (если не передан, то запрос будет GET)
  * @param method - Метод API (без префикса /api/)
  * @param [data] - Данные запроса (если не переданы, то запрос будет GET)
  * @return JSON
  * @async
  */
async function api<Response = void, Request = null>(method: string, data?: Request): Promise<Response> {
  const protocol = window.location.protocol.replace(/:$/, '') as ServerProtocol;

  const host = 'localhost';
  const port = __API_PORT__ || (protocol === 'http' ? 80 : 443);
  const url = `${protocol}://${host}:${port}/api/${method}`;

  const headers = new Headers();
  headers.append('Origin', window.location.origin);
  if (data) headers.append('Content-Type', 'application/json');

  const response = await fetch(url, {
    method: 'post',
    credentials: 'include',
    headers,
    body: data ? JSON.stringify(data) : null
  });

  const result = await response.json();
  if (result.error) {
    handleError(result);
    throw new Error(result.message);
  }
  return result as Response;
}

export default api;
