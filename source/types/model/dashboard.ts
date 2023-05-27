import type { UUID } from "node:crypto";

export type DashboardModel = {
    id?: UUID; // UUID
    name: string;
    department: UUID; // UUID
    removed?: boolean;
}