import { createEffect, createEvent, sample } from 'effector';
import { appendHistory as appendHistoryMethod } from '@service/dashboard';
import type { HistoryAppendModel } from '@app/types/model/history';

export const appendHistory = createEvent<HistoryAppendModel>();
const appendHistoryFx = createEffect(appendHistoryMethod);

sample({
  clock: appendHistory,
  target: appendHistoryFx
});
