import type { UUID } from "node:crypto";
import { DepartmentModel } from "./department";

export type VacancyModel = {
    id?: UUID; // UUID
    name: string;
    department: DepartmentModel; // UUID
    description: string;
}

export type VacancyListFilter = {
    department?: UUID; // UUID
    company?: UUID; // UUID
}