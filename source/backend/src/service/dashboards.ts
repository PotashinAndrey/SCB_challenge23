import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { departmentById } from "./departments";
import { DashboardModel } from "@app/types/model/dashboard";

export const dashboardsList = async (db: DB) => { // dashboard/get
  let results = await db.select({
    fields: '*',
    tables: 'flow.dashboard'
  });

  return results;
};

export const processList = async (db: DB) => { // dashboard/get
  let results = await db.select({
    fields: '*',
    tables: 'flow.process'
  });

  return results;
};

// // + SELECT * from flow.process where dashboard = '9e05e3e5-017b-4698-9abd-583ffb7dd510' order by "order" ASC
export const processByDashboardId = async (id: UUID, db: DB) => { // dashboard/get
  let results = await db.select({
    fields: '*',
    tables: 'flow.process',
    where: "dashboard = $1",
    values: [id],
    spetialText: 'order by "order" ASC'
  });

  return results;
};

export const stepsList = async (db: DB) => {
  let results = await db.select({
    fields: '*',
    tables: 'flow.step'
  });

  return results;
};

export const stepById = async (id: UUID, db: DB) => {
  let results = await db.select({
    fields: '*',
    tables: 'flow.step',
    where: "id = $1",
    values: [id]
  });

  return results;
};

  // + массив actions
export const actionsList = async (db: DB) => {
  let results = await db.select({
    fields: '*',
    tables: 'flow.actions'
  });

  return results;
};

export const dashboardById = async (id: UUID, db: DB) => { // dashboard/get
  // let results = await db.selectRow({
  //   fields: '*',
  //   tables: 'flow.dashboard',
  //   where: "id = $1",
  //   values: [id]
  // });

  // + SELECT step, "order", flow.process.description as process_description, "name", flow.step.description as step_description, "action" from flow.process, flow.step where dashboard = '9e05e3e5-017b-4698-9abd-583ffb7dd510' and flow.step.id = flow.process.step order by "order" ASC
  let results = await db.select<any>({
    text: `SELECT step, "order", flow.process.description as process_description, "name", flow.step.description as step_description, "action" from flow.process, flow.step where dashboard = '${id}' and flow.step.id = flow.process.step order by "order" ASC`
  });



  // tasksList

  return results;
};

export const tasksList = async (filter: object, db: DB) => { // dashboard/get
  let results = await db.select<DashboardModel>({
    fields: '*',
    tables: 'flow.tasks'
  });

  return results;
};

export const createDashboard = async (values: DashboardModel, db: DB) => {
  const { department, name } = values;
  return await db.insert({
    fields: "department, name",
    tables: "flow.dashboard",
    values: [department, name],
    returning: "id"
  });
};

export const dashboardByDepartment = async (id: UUID, db: DB) => {
  const department = await db.selectRow({
    fields: '*',
    tables: 'flow.dashboard',
    where: 'department = $1',
    values: [id]
  });
  return {
    ...department,
    department: await departmentById(id, db)
  };
}
