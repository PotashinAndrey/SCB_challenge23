import { createEvent, createStore } from 'effector';

export const createVisibilityController = (initialValue = false) => {
  const open = createEvent<void>();
  const close = createEvent<void>();
  const toggle = createEvent<void>();
  const $isOpen = createStore<boolean>(initialValue)
    .on(open, () => true)
    .on(close, () => false)
    .on(toggle, (value) => !value);
  return {
    open,
    close,
    toggle,
    $isOpen,
  };
};
