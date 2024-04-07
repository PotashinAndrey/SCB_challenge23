import type { UUID } from 'crypto';
import type { TaskModel, TaskCreateFormValues } from '@app/types/model/task';
import { createEffect, createEvent, sample, createStore } from 'effector';
import { taskCreate, taskUpdate } from '@service/tasks';
import factoryPopupBehaviour from '../factory/popup';
import createForm from '../factory/form';
import { loadDashboard } from './process';

// просмотр таски
export const taskViewPopup = factoryPopupBehaviour<TaskModel>(false);
export const $currentTask = createStore<TaskModel>({} as TaskModel);

sample({
  clock: taskViewPopup.open,
  target: $currentTask
});

// редактирование таски
export const currentTaskUpdate = createEvent<Partial<TaskModel>>();
sample({
  clock: currentTaskUpdate,
  source: $currentTask,
  fn: (currentTask, updates) => ({ ...currentTask, ...updates }),
  // TODO: на самом деле надо запускать updateTaskFx и только потом обновлять текущую таску, но пока пойдет
  target: $currentTask
});

// создение таски
export const createTaskPopup = factoryPopupBehaviour(false);

export const $$taskCreateForm = createForm<TaskCreateFormValues>({
  initialValues: {
    title: '',
    description: '',
    process: '' as UUID
  }
});

sample({
  clock: $$taskCreateForm.submit,
  source: $$taskCreateForm.$values,
  fn: (values) => console.log('values', values),
})

// ---

export const createTask = createEvent<TaskModel>();
export const updateTask = createEvent<TaskModel>();
// export const setCurrentTask = createEvent<TaskModel>();

const createTaskFx = createEffect(taskCreate);
const updateTaskFx = createEffect(taskUpdate);


export const isTaskCreating = createTaskFx.pending;
export const isTaskUpdating = updateTaskFx.pending;

sample({
  clock: createTask,
  target: createTaskFx
});

sample({
  clock: updateTask,
  target: updateTaskFx
});

// TODO Сделать чтобы при создании таски, с бека возвращался таск,
//  тогда не придется заново весь дашборд запрашивать
// sample({
//   clock: createTaskFx.done,
//   target: [createTaskPopup.close, loadDashboard]
// });

// TODO Сделать чтобы при обновлении таски, с бека возвращался таск,
//  тогда не придется заново весь дашборд запрашивать
sample({
  clock: updateTaskFx.done,
  target: loadDashboard
});

// sample({
//   clock: updateTaskFx.doneData,
//   target: setCurrentTask
// });

// export const createTaskForm = createForm();
// export const createTaskFormSubmit = createEvent<any>();

// sample({
//   clock: createTaskFormSubmit,
//   source: [createTaskForm.$values, $currentDashboardId],
//   fn: ([formValues, currentDashboardId]) => ({
//     process: formValues.process,
//     dashboard: currentDashboardId,
//     title: formValues.name,
//     description: formValues.description
//   }),
//   target: createTaskFx
// });
