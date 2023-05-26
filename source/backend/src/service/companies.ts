import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { CompanyModel } from "@app/types/model/company";

export const companyCreate = async (values: CompanyModel, db: DB): Promise<UUID> => {
    const { name, description } = values;
    const data = await db.insert({
        fields: "name, description",
        tables: "company.companies",
        values: [name, description],
        returning: "id"
    });

    const id = data.rows[0].id as UUID;
    return id;
}

export const companiesList = async (db: DB): Promise<Array<CompanyModel>> => {
    return db.select<CompanyModel>({
        fields: "name, description",
        tables: "company.companies"
    });
}
