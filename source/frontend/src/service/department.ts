import api from "../scripts/api";

export const departamentListLoad = (): Promise<any> => {
  return api("departments/list", {});
}
