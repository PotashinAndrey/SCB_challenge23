import type { Store, Event } from 'effector';
import type { Form, FieldState, SetFieldStateParams } from 'effector-react-form';
import type { SyntheticEvent } from 'react'; // !
import { createEvent, sample } from 'effector';
import { debounce } from 'patronum/debounce';
import ObjectPath from '@app/scripts/ObjectPath';

/** Частота проверок запросами при печати пользователя (в мс) */
export const TYPING_REQUEST_COOLDOWN = 360;

export const userInputHandler = function userInputHandler<T>(
  source: Store<T>,
  name?: string
): Event<T> {
  return debounce({ source, timeout: TYPING_REQUEST_COOLDOWN, name });
};

/** Изменить значение поля и вызвать запуск обработчиков этого */
export const changeFieldForm = function changeFieldForm<T, F = string>(
  form: Form<T>
): Event<{ field: string; value: F }> {
  const event = createEvent<{ field: string; value: F }>();

  sample({
    clock: event,
    source: form.$values,
    filter: (values, { field, value }) =>
      new ObjectPath(field).getObjectValue(values) !== value,
    fn: (_, { field, value }) => ({ name: field, event: value as SyntheticEvent }),
    target: form.onChangeFieldBrowser,
  });

  return event;
};

/** Сбросить поле */
export const resetFieldState = function resetFieldState<T>(
  form: Form<T>
): Event<{ field: string }> {
  // (form: Form, field: string): void => {
  const event = createEvent<{ field: string }>();

  const defaultState: FieldState = {
    active: false,
    blurred: true,
    blurredAfterOuterError: false,
    changed: false,
    changedAfterOuterError: false,
    touched: false,
    touchedAfterOuterError: false,
    validate: undefined,
    _type: 'fieldMeta',
  };

  sample({
    clock: event,
    fn: ({ field }) => ({ field, state: defaultState }),
    target: form.setFieldState,
  });

  return event;
};
