import type { UUID } from "node:crypto";

export type SkillModel = {
  id?: UUID;
  name: string;
  description: string;
  type: string;
}