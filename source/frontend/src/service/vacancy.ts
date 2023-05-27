import { VacancyModel } from "@app/types/model/vacancy";
import api from "../scripts/api";

export const vacancyListLoad = (): Promise<any> => {
    return api("vacancies/list", {});
}

export const vacancyCreateService = (vacancy: VacancyModel): Promise<any> => {
    return api("vacancies/append", vacancy);
}
