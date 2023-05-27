// import type { QueryConfig } from "pg";
import type { RequestInsertDB, RequestSelectDB } from "@app/types/DB";

export default class SQL {
  static requestSelect(request: RequestSelectDB): string {
    if ("text" in request) return request.text;

    let text = `select ${request.fields} from ${request.tables}`;
    if ((request.where || []).length > 0) text += " where " + request.where;

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
};
