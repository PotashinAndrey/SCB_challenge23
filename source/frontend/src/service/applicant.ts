import api from "../scripts/api";

export const applicantLoad = (): Promise<any> => {
  return api("candidates/get");
}

export const applicantsListLoad = (): Promise<any> => {
  return api("candidates/list");
}
