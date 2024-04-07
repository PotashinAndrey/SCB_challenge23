import type { UUID } from 'crypto';
import { createEffect, sample, createEvent, createStore } from 'effector';
import { createRoute, chainRoute } from 'atomic-router';
import { createMutation, createQuery, update } from '@farfetched/core';
import { startChain } from '@farfetched/atomic-router';
import { projectListLoad, projectCreate } from '@service/project';
// import factoryExteralData from '../factory/external';

export const projectListQuery = createQuery({
  handler: projectListLoad,
  initialData: { items: [] }
});

/** Роуты */
export const routes = {
  list: createRoute()
};

chainRoute({
  route: routes.list,
  ...startChain(projectListQuery)
});

export const projectCreateMutation = createMutation({ handler: projectCreate });

update(projectListQuery, {
  on: projectCreateMutation,
  by: {
    success: () => ({
      error: null,
      refetch: true
    }),
  }
});

// export const setCurrentProjectId = createEvent<UUID | null>();
// export const $currentProjectId = createStore<UUID | null>(null)
//   .on(projectListLoadFx.doneData, (_state, data) => data.items[0]?.id ?? null)
//   .on(setCurrentProjectId, (_state, newCurrentProject) => newCurrentProject);

// sample({
//   clock: [projectPageOpen, routing.dashboards.opened],
//   target: projectListLoadFx
// });

// sample({
//   clock: projectListLoadFx.doneData,
//   target: projectListData.$store
// });
