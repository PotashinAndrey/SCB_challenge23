import { UUID } from "crypto";
import api from "../scripts/api";

export const allActionsLoad = (): Promise<any> => {
  return api("actions/list");
}