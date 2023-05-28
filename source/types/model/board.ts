import type { UUID } from "node:crypto";

export type BoardCardModelType = {
  id: UUID | string;
  name: string;
  step: string;
}

export type BoardColumnModelType = {
  name: string;
  action?: string;
  order: number;
  process_description?: string;
  step: string;
  step_description?: string;
}
