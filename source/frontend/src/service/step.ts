import { UUID } from "crypto";
import api from "../scripts/api";

export const allStepsLoad = (): Promise<any> => {
    return api("steps/list");
}

export const getStepById = (id: UUID): Promise<any> => {
    return api("steps/get", { id });
}
