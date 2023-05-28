import { UUID } from "crypto";
import api from "../scripts/api";
import type { CandidateProcessModel } from "@app/types/model/candidateProcess";

export const applicantLoad = (): Promise<any> => {
  return api("candidates/get");
}

export const applicantsListLoad = (): Promise<any> => {
  return api("candidates/list")
}

export const candidatesInProcessList = (): Promise<any> => {
  return api("candidates/in-process/list");
}

export const applicantApply = (model: CandidateProcessModel): Promise<any> => {
  return api("candidates/apply", model);
}
