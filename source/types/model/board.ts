import type { UUID } from "node:crypto";

export type BoardCardModelType = {
  id: UUID;
  name: string;
  step: string;
}

export type BoardColumnModelType = {
  name: string;
  total: number;
  count: number;
  items?: Array<BoardCardModelType>;
}
