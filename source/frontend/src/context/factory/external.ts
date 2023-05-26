import { createStore } from "effector";
import type { Effect, Store } from "effector";

type ExternalData<S> = {
  $store: Store<S>,
  $error: Store<string>,
  $loading: Store<boolean>
};
type ExternalDataNullable<S> = ExternalData<S | null>;

function factory<T, S = any>(effect: Effect<T, S, Error>): ExternalDataNullable<S>;
function factory<T, S = any>(effect: Effect<T, S, Error>, initial: S): ExternalData<S>;
function factory<T, S = any>(effect: Effect<T, S, Error>, initial?: S): ExternalDataNullable<S> | ExternalData<S> {
  const $error = createStore<string>("");
  const $loading = createStore<boolean>(false);

  $loading.on(effect.pending, (_, status) => status);
  $error.on(effect.failData, (_, error) => error.message).reset(effect.done);

  const data = { $error, $loading };
  return initial !== undefined
    ? { ...data, $store: createStore<S>(initial) } as ExternalData<S>
    : { ...data, $store: createStore<S | null>(null) } as ExternalDataNullable<S>;
}

export default factory;
