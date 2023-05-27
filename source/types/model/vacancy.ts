import type { UUID } from "node:crypto";

export type VacancyModel = {
    id?: UUID; // UUID
    name: string;
    department: UUID; // UUID
    description: string;
}

export type VacancyListFilter = {
    department?: UUID; // UUID
    company?: UUID; // UUID
}