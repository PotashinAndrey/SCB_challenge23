import type { Event, Store } from 'effector';
import { createStore, createEvent } from 'effector';

type PopupBehaviourEvents<S = void> = { open: Event<S>; close: Event<void> };
type PopupBehaviourUnits<S = void> = PopupBehaviourEvents<S> & {
  $visible: Store<boolean>;
};
type PopupBehaviourShape<S = void> = PopupBehaviourEvents<S> & {
  visible: Store<boolean>;
};

type PopupBehaviour<S = void> = PopupBehaviourUnits<S> & {
  '@@unitShape': () => PopupBehaviourShape<S>;
};

function factoryPopupBehaviour<S = void>(initial = false): PopupBehaviour<S> {
  const open = createEvent<S>();
  const close = createEvent<void>();
  const $visible = createStore<boolean>(initial);

  $visible.on(open, () => true).on(close, () => false);

  const unitShape = (): PopupBehaviourShape<S> => ({
    visible: $visible,
    open,
    close,
  });

  return { $visible, open, close, '@@unitShape': unitShape };
}

export default factoryPopupBehaviour;
