import type { ServerProtocol } from '@app/types/config';

declare const __API_PORT__: number;

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
    throw new Error(result.message);
  }
  return result as T;
};

export default api;
