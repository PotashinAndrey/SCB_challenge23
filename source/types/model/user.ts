import type { UUID } from "crypto";

export type UserLoginModel = {
  login: string;
  password: string;
};

export type UserModel = {
  name: string;
  email: string;
  id: UUID;
};

export type UserRegistrationModel = {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
};
