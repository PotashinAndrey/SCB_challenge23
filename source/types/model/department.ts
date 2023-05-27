import type { UUID } from "node:crypto";

export type DepartmentModel = {
    id: UUID; // UUID
    company: UUID; // UUID
    name: string;
}
