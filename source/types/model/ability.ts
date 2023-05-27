import type { UUID } from "node:crypto";

export type AbilityModel = {
  id?: UUID;
  applicant: UUID;
  skill: UUID;
  level: number;
  description: string;
}