import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { DepartmentModel } from "@app/types/model/department";

export const departmentsList = async (filter: {company?: UUID} = {}, db: DB): Promise<Array<DepartmentModel>> => {
    let result;
    if (filter?.company) {
        result = db.select<DepartmentModel>({
            text: `select id, name, company from company.departments where company='${filter.company}'`
        });
    } else {
        result = db.select<DepartmentModel>({
            text: `select id, name, company from company.departments`
        });
    }
    return result;
}
