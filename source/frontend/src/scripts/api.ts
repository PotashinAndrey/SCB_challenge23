import type { ServerProtocol } from '@app/types/config';
import { routing } from '@context/router';
import { FastifyError } from 'fastify';

declare const __API_PORT__: number;

const handleError = (error: FastifyError) => {
  switch (error.statusCode) {
    case 401:
      // Redirect to login page
      routing.login.open();
      break;
    case 403:
      // Redirect to forbidden page
      routing.forbidden.open();
      break;
    default:
      break;
  }
};

const api = async <S, T>(method: string, data?: S): Promise<T> => {
  const protocol = window.location.protocol.replace(/:$/, '') as ServerProtocol;

  const host = 'localhost';
  const port = __API_PORT__ || (protocol === 'http' ? 80 : 443);
  const url = `${protocol}://${host}:${port}/api/${method}`;

  const response = await fetch(url, {
    method: 'post',
    credentials: 'include',
    body: data ? JSON.stringify(data) : null
  });

  const result = await response.json();
  if (result.error) {
    handleError(result);
    throw new Error(result.message);
  }
  return result as T;
};

export default api;
