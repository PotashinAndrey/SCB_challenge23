import { TaskModel } from '@app/types/model/task';
import { createEffect, createEvent, sample } from 'effector';
import { taskCreate } from 'src/service/tasks';
import { createVisibilityController } from 'src/utils/visibilityController';
import { loadDashboard } from './process';

export const modalToggler = createVisibilityController(false);

export const createTask = createEvent<TaskModel>();
export const createTaskFx = createEffect(taskCreate);

export const isTaskCreating = createTaskFx.pending;

sample({
  clock: createTask,
  target: createTaskFx,
});

sample({
  clock: createTaskFx.done,
  target: [modalToggler.close, loadDashboard],
});
