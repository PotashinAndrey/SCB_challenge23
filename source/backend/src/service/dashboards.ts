import type DB from '../../class/DB';
import type { UUID } from 'node:crypto';
import { projectById } from './projects';
import { DashboardModel } from '@app/types/model/dashboard';

export const dashboardsList = async (db: DB) => {
  return await db.select({ fields: '*', tables: 'flow.dashboard' });
};

/** Список колонок дашборда */
export const processByDashboardId = async (id: UUID, db: DB) => {
  // dashboard/get
  return db.select({
    fields: `"process".id as id, step as "process", "order", flow.process.description as process_description, "name", flow.step.description as step_description, "action"`,
    tables: 'flow.process, flow.step',
    where: 'dashboard = $1 and flow.step.id = flow.process.step',
    values: [id],
    order: '"order" asc',
  });
  // SELECT step, "order", flow.process.description as process_description, "name", flow.step.description as step_description, "action" from flow.process, flow.step where dashboard = '9e05e3e5-017b-4698-9abd-583ffb7dd510' and flow.step.id = flow.process.step order by "order" ASC
};

export const dashboardById = async (id: UUID, db: DB) => {
  // dashboard/get
  return db.selectRow({
    fields: '*',
    tables: 'flow.dashboard',
    where: 'id = $1',
    values: [id],
  });
};

/** Список задач на дашборде */
export const tasksList = (dashboardID: UUID, db: DB) => {
  // dashboard/get
  return db.select({
    fields: 'tasks.id as task',
    tables: 'flow.tasks',
    where: 'dashboard = $1 and tasks.removed = false',
    values: [dashboardID],
  });
  // select tasks.id as task from flow.tasks where dashboard = 'f236cb65-63ef-4d32-bc96-0792dab66801' and tasks.removed = false
};

/** Истории перемещений задач */
export const dashboardHistory = (
  dashboardID: UUID,
  db: DB
): Promise<
  Array<{ timestamp: any; task: UUID; from: UUID; to: UUID; action: string }>
> => {
  // dashboard/get
  return db.select({
    fields:
      'history."timestamp", tasks.id as task, history."from" as "from", history."to" as "to", history."action" as "action"',
    tables: 'flow.history, flow.tasks, flow.process',
    // where: "tasks.dashboard = $1 and history.task = tasks.id and tasks.removed = false",
    where: `tasks.dashboard = $1 and
      history.task = tasks.id and
      (flow.history.to = process.id or flow.history.from = process.id) and
      process.dashboard = tasks.dashboard and
      process.removed = false and tasks.removed = false`,
    values: [dashboardID],
  });
};

// ?
export const stepsList = async (db: DB) => {
  let results = await db.select({
    fields: '*',
    tables: 'flow.step',
  });

  return results;
};

export const stepById = async (id: UUID, db: DB) => {
  let results = await db.select({
    fields: '*',
    tables: 'flow.step',
    where: 'id = $1',
    values: [id],
  });

  return results;
};

export const processList = async (db: DB) => {
  return await db.select({
    fields: '*',
    tables: 'flow.process',
  });
};

export const createDashboard = async (values: DashboardModel, db: DB) => {
  const { project, name } = values;
  return await db.insert({
    fields: 'project, name',
    tables: 'flow.dashboard',
    values: [project, name],
    returning: 'id',
  });
};

export const dashboardByProject = async (id: UUID, db: DB) => {
  const project = await db.selectRow({
    fields: '*',
    tables: 'flow.dashboard',
    where: 'project = $1',
    values: [id],
  });
  return {
    ...project,
    project: await projectById(id, db),
  };
};

export const historyAppend = async (taskId: UUID, columnId: string, db: DB) => {
  const id = await db.insertRow({
    tables: 'flow.history',
    fields: 'task, to',
    values: [taskId, columnId],
  });

  return { id };
};
