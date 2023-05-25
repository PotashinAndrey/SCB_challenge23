import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { CalendarEventModel } from "@app/types/model/calendar";

export const eventCreate = async (values: CalendarEventModel, db: DB): Promise<UUID> => {
    const { task, employee, status, author, type, name, timestamp, description } = values;
    const data = await db.insert({
        fields: "task, employee, status, author, type, name, timestamp, description",
        tables: "flow.calendar_events",
        values: [task, employee, status, author, type, name, timestamp, description],
        returning: "id"
    });

    const id = data.rows[0].id as UUID;
    return id;
}

export const eventsList = async (db: DB): Promise<Array<CalendarEventModel>> => {
    return db.select<CalendarEventModel>({
        fields: "task, employee, status, author, type, name, timestamp, description",
        tables: "flow.calendar_events"
    });
}
