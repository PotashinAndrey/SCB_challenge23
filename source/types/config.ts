export type ServerProtocol = "http" | "https";

export type ServerInfo = {
  host: string;
  port: number;
}

export type BackendConfig = { [protocol in ServerProtocol]?: ServerInfo };
