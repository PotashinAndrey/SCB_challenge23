import api from "../scripts/api";

export const applicantLoad = (): Promise<any> => {
  return api("candidates/get");
}

export const applicantsListLoad = (): Promise<any> => {
  return api("candidates/list");
}

export const departamentListLoad = (): Promise<any> => {
  return api("departments/list", {});
}

export const vacancyListLoad = (): Promise<any> => {
  return api("vacancies/list", {});
}