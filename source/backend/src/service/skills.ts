import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { SkillModel } from "@app/types/model/skill";

export const skillById = async (id: UUID, db: DB) => {
    const result = await db.selectRow<SkillModel>({
        fields: "*",
        tables: "service.skills",
        where: "id = $1",
        values: [id]
    });
    return result;
};

export const skillsList = async (db: DB) => {
    const result = await db.select<SkillModel>({
        fields: "*",
        tables: "service.skills"
    });
    return result;
};
