import type { CandidateModel } from "@app/types/model/candidate";
import api from "../scripts/api";

export const createCandidateService = (model: CandidateModel): Promise<any> => {
  return api<CandidateModel, any>("candidates/append", model);
}
