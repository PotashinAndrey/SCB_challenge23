import { UUID } from "crypto";
import api from "../scripts/api";

export const applicantLoad = (): Promise<any> => {
  return api("candidates/get");
}

export const applicantsListLoad = (): Promise<any> => {
  return api("candidates/list");
}

export const applicantApply = (id: UUID): Promise<any> => {
  return api("candidates/apply", { id });
}
