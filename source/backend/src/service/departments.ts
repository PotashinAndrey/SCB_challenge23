import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { DepartmentModel } from "@app/types/model/department";
import { companyById } from "./companies";

export const departmentsList = async (filter: {company?: UUID} = {}, db: DB): Promise<Array<DepartmentModel>> => {
    let departments: Array<DepartmentModel> = [];
    if (filter?.company) {
        departments = await db.select<DepartmentModel>({
            text: `select id, name, company from company.departments where company='${filter.company}'`
        });
    } else {
        departments = await db.select<DepartmentModel>({
            text: `select id, name, company from company.departments`
        });
    }
    let extDepartments = [];
    for (let i = 0; i < departments.length; i++) {
        let extDepartment = {
            ...departments[i],
            company: await companyById(departments[i].company, db)
        };
        extDepartments.push(extDepartment)
    }
    return extDepartments as unknown as Array<DepartmentModel>;
}

export const departmentById = async (id: UUID, db: DB) => {
    const result = await db.selectRow<DepartmentModel>({
        fields: "*",
        tables: "company.departments",
        where: "id = $1",
        values: [id]
    });
    const extDepartment = {
        ...result,
        company: await companyById(result.company, db)
    };
    return extDepartment as unknown as DepartmentModel;
};
