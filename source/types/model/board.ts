import type { UUID } from "node:crypto";

export type BoardCardModelType = {
  id: UUID | string;
  name: string;
  step: string;
}

export type BoardColumnModelType = {
  id: UUID;
  name: string;
  order: number;
  action?: string;
  process_description?: string;
  step_description?: string;
}
