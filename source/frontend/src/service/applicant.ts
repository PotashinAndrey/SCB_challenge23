import { UUID } from "crypto";
import api from "../scripts/api";
import type { CandidateProcessModel } from "@app/types/model/candidateProcess";
import { CalendarEventModel } from "@app/types/model/calendar";

export const applicantLoad = (id: UUID): Promise<any> => {
  return api("candidates/get", { id });
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

export const interviewCreate = (model: CalendarEventModel): Promise<any> => {
  return api("calendar/append", model);
}

export const calendarListLoad = (): Promise<any> => {
  return api("calendar/list")
}