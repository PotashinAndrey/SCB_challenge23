import { createEffect, sample, createEvent } from 'effector';
import factoryExteralData from '../factory/external';
import { projectListLoad } from '../../service/project';

export const projectPageOpen = createEvent<any>();
export const projectListLoadFx = createEffect(projectListLoad);
export const projectListData = factoryExteralData(projectListLoadFx);

sample({
  clock: projectPageOpen,
  target: projectListLoadFx,
});

sample({
  clock: projectListLoadFx.doneData,
  target: projectListData.$store,
});
