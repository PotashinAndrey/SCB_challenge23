import type { UUID } from "node:crypto";

export type CalendarEventModel = {
    task: UUID;
    employee: UUID;
    status: UUID;
    author: UUID;
    type: UUID;
    name: string;
    timestamp: number;
    description: string;
}
  