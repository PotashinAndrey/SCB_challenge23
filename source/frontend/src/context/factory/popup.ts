import type { Event, Store } from "effector";
import { createStore, createEvent } from "effector";

type PopupBehaviourEvents<S = void> = { open: Event<S>, close: Event<void> };
type PopupBehaviourUnits<S = void> = PopupBehaviourEvents<S> & { $visible: Store<boolean> };
type PopupBehaviourShape<S = void> = PopupBehaviourEvents<S> & { visible: Store<boolean> };

type PopupBehaviour<S = void> = PopupBehaviourUnits<S> & { "@@unitShape": () => PopupBehaviourShape<S> };

function factoryPopupBehaviour<S = void>(initial = false): PopupBehaviour<S> {
  const open = createEvent<S>();
  const close = createEvent<void>();
  const $visible = createStore<boolean>(initial);

  // const $popupData = createStore<any>({});
  // const setPopupData = createEvent<S>();
  // const getPopupData = createEvent<void>();

  $visible
    .on(open, () => true)
    .on(close, () => false);

  // $popupData
  //   .on(setPopupData, (store, data) => {
  //     return {...store, ...data};
  //   })

  const unitShape = (): PopupBehaviourShape<S> => ({
    visible: $visible,
    // popupData: $popupData,
    open,
    close,
    // setPopupData
  });

  return { $visible, open, close, "@@unitShape": unitShape };
}

export default factoryPopupBehaviour;
