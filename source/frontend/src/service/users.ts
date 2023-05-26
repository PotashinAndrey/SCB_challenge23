import type { UserLoginModel } from "@app/types/model/user";
import api from "../scripts/api";

export const loginService = (model: UserLoginModel): Promise<any> => {
  return api<UserLoginModel, any>("users/login", model);
}
