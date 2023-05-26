import type { CreateCandidateModel } from "@app/types/model/candidate";
import api from "../scripts/api";

export const createCandidateService = (model: CreateCandidateModel): Promise<any> => {
  return api<CreateCandidateModel, any>("applicants/append", model);
}
