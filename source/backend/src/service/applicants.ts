import type { UUID } from "node:crypto";
import type DB from "../../class/DB";
// import type { UUID } from "node:crypto";
// import { CalendarEventModel } from "@app/types/model/calendar";

export const applicantByID = async (db: DB): Promise<Array<any>> => {
  const id: UUID = '601e10c1-39c2-4e65-bd3a-3673afdc4ae1';
  return db.selectRow<any>({
    fields: "*",
    tables: "service.applicants",
    where: "id = $1",
    values: [id]
  });
}

export const applicantsList = async (db: DB): Promise<Array<any>> => {
  return db.select<any>({
    fields: "*",
    tables: "service.applicants"
  });
}
