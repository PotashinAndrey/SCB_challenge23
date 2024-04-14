export type ServerProtocol = 'http' | 'https';

export type ServerInfo = {
  host: string;
  port: number;
};

export type BackendConfig = {
  protocol: ServerProtocol;
} & {
  [x in ServerProtocol]?: ServerInfo;
};

export type FrontendConfig = {
  protocol: ServerProtocol;
  host: string;
  port: number;
};
