import { createEffect, sample, createEvent, createStore } from 'effector';
import { UUID } from 'crypto';
import factoryExteralData from '../factory/external';
import { projectListLoad } from '../../service/project';
import { routing } from '../router';

export const projectPageOpen = createEvent<any>();
export const projectListLoadFx = createEffect(projectListLoad);
export const projectListData = factoryExteralData(projectListLoadFx);

export const setCurrentProjectId = createEvent<UUID | null>();
export const $currentProjectId = createStore<UUID | null>(null)
  .on(projectListLoadFx.doneData, (_state, data) => data.items[0]?.id ?? null)
  .on(setCurrentProjectId, (_state, newCurrentProject) => newCurrentProject);

sample({
  clock: [projectPageOpen, routing.dashboards.opened],
  target: projectListLoadFx
});

sample({
  clock: projectListLoadFx.doneData,
  target: projectListData.$store
});
