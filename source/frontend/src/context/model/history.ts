import { HistoryAppendModel } from '@app/types/model/history';
import { createEffect, createEvent, sample } from 'effector';
import { appendHistory as appendHistoryMethod } from '../../service/dashboard';

export const appendHistory = createEvent<HistoryAppendModel>();
const appendHistoryFx = createEffect(appendHistoryMethod);

sample({
  clock: appendHistory,
  target: appendHistoryFx,
});
