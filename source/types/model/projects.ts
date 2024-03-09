import type { UUID } from "node:crypto";

export type ProjectModel = {
    id: UUID; // UUID
    company: UUID; // UUID
    name: string;
}
