// import type { QueryConfig } from "pg";
import type { RequestInsertDB, RequestSelectDB, RequestRelationDB, RequestUpdateFieldByID } from "@app/types/DB";

export default class SQL {
  static requestSelect(request: RequestSelectDB): string {
    if ("text" in request) return request.text;

    let text = `select ${request.fields} from ${request.tables}`;
    if ((request.where || []).length > 0) text += " where " + request.where;

    if (request.order) text += " order by " + request.order.trim();

    return text;
  }

  static requestInsert(request: RequestInsertDB): string { // QueryConfig?
    if ("text" in request) return request.text;

    const fields = `"` + request.fields.replace('"', "").replace(/,\s+/g, `", "`) + `"`;
    const tables = `"` + request.tables.replace('"', "").replace(/\./g, `"."`) + `"`;

    const values = request.values?.map((e, i) => "$" + (i + 1)).join(", ");
    let text: string = `insert into ${tables} (${fields}) values (${values})`;
    // if ((request.where || []).length > 0) text += " where " + request.where;
    if (request.returning) text += " returning " + request.returning;

    return text;
  }

  static requestUpdateFiledByID(request: RequestUpdateFieldByID): string {
    const table = `"` + request.table.replace('"', "").replace(/\./g, `"."`) + `"`;
    return `update ${table} set "${request.field}" = $1 where id = $2 returning *`;
  }

  static requestRelationParse(request: RequestRelationDB): { name: string, sourceTable: string, sourceField: string, targetTable: string, targetField: string } {
    const sourceSplitIndex = request.source.lastIndexOf(".");
    const sourceTable = request.source.substring(0, sourceSplitIndex).replace(".", '"."');
    const sourceField = request.source.substring(sourceSplitIndex + 1);

    const targetSplitIndex = request.target.lastIndexOf(".");
    const targetTable = request.target.substring(0, targetSplitIndex).replace(".", '"."');
    const targetField = request.target.substring(targetSplitIndex + 1);

    const name = request.source + "_" + request.target;

    return { name, sourceTable, sourceField, targetTable, targetField };
  }

  static removeRelation(request: RequestRelationDB): string {
    const { name, targetTable } = SQL.requestRelationParse(request);
    return `alter table "${targetTable}" drop constraint if exists "${name}"`;
  }

  static createRelation(request: RequestRelationDB): string {
    const { name, sourceTable, sourceField, targetTable, targetField } = SQL.requestRelationParse(request);
    return `alter table "${targetTable}" add constraint "${name}" foreign key ("${targetField}") references "${sourceTable}" ("${sourceField}")`;
  }
};
