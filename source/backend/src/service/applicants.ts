import type DB from "../../class/DB";
// import type { UUID } from "node:crypto";
// import { CalendarEventModel } from "@app/types/model/calendar";

export const applicantsList = async (db: DB): Promise<Array<any>> => {
    return db.select<any>({
        fields: "*",
        tables: "service.applicants"
    });
}
