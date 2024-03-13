import { TaskModel } from '@app/types/model/task';
import { createEffect, createEvent, sample, createStore } from 'effector';
import { taskCreate, taskUpdate } from 'src/service/tasks';
import factoryPopupBehaviour from '../factory/popup';
import { loadDashboard } from './process';

export const createTask = createEvent<TaskModel>();
export const updateTask = createEvent<TaskModel>();
export const setCurrentTask = createEvent<TaskModel>();

const createTaskFx = createEffect(taskCreate);
const updateTaskFx = createEffect(taskUpdate);

export const createTaskPopup = factoryPopupBehaviour(false);
export const taskViewPopup = factoryPopupBehaviour(false);
export const $currentTask = createStore<TaskModel>({} as TaskModel).on(
  setCurrentTask,
  (_state, task) => task
);

export const isTaskCreating = createTaskFx.pending;
export const isTaskUpdating = updateTaskFx.pending;

sample({
  clock: createTask,
  target: createTaskFx,
});

sample({
  clock: updateTask,
  target: updateTaskFx,
});

// TODO Сделать чтобы при создании таски, с бека возвращался таск,
//  тогда не придется заново весь дашборд запрашивать
sample({
  clock: createTaskFx.done,
  target: [createTaskPopup.close, loadDashboard],
});

// TODO Сделать чтобы при обновлении таски, с бека возвращался таск,
//  тогда не придется заново весь дашборд запрашивать
sample({
  clock: updateTaskFx.done,
  target: loadDashboard,
});
