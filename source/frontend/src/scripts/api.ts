import type { ServerProtocol } from "@app/types/config";

// declare const __API_HOST__: string;
declare const __API_PORT__: number;

const api = async <S, T>(method: string, data?: S): Promise<T> => {
  try {
    const protocol = window.location.protocol.replace(/:$/, "") as ServerProtocol;

    const host = "localhost";
    const port = __API_PORT__ || (protocol === "http" ? 80 : 443);
    const url = `${protocol}://${host}:${port}/api/${method}`;

    console.log("api", { url });

    const response = await fetch(url, {
      method: "post",
      body: data ? JSON.stringify(data) : null
    });

    const result = await response.json();
    return result as T;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export default api;
