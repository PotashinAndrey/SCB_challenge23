import { createStore } from 'effector';
import type { Effect, Store } from 'effector';

type ExternalDataUnits<S> = {
  $store: Store<S>;
  $error: Store<string>;
  $loading: Store<boolean>;
};
type ExternalDataShape<S> = {
  store: Store<S>;
  error: Store<string>;
  loading: Store<boolean>;
};

type ExternalDataNullableUnits<S> = ExternalDataUnits<S | null>;
type ExternalDataNullableShape<S> = ExternalDataShape<S | null>;

type ExternalData<S> = ExternalDataUnits<S> & {
  '@@unitShape': () => ExternalDataShape<S>;
};
type ExternalDataNullable<S> = ExternalDataNullableUnits<S> & {
  '@@unitShape': () => ExternalDataNullableShape<S>;
};

function factory<T, S = any>(effect: Effect<T, S, Error>): ExternalDataNullable<S>;
function factory<T, S = any>(effect: Effect<T, S, Error>, initial: S): ExternalData<S>;
function factory<T, S = any>(effect: Effect<T, S, Error>, initial?: S): ExternalDataNullable<S> | ExternalData<S> {
  const $error = createStore<string>('');
  const $loading = createStore<boolean>(false);

  $loading.on(effect.pending, (_, status) => status);
  $error.on(effect.failData, (_, error) => error.message).reset(effect.done);

  const data = { $error, $loading };

  const $store = initial !== undefined ? createStore<S>(initial) : createStore<S | null>(null);

  const unitShape = () => ({
    store: $store,
    error: $error,
    loading: $loading
  });

  return initial !== undefined
    ? ({
        ...data,
        $store,
        '@@unitShape': unitShape as () => ExternalDataShape<S>
      } as ExternalData<S>)
    : ({
        ...data,
        $store,
        '@@unitShape': unitShape as () => ExternalDataNullableShape<S>
      } as ExternalDataNullable<S>);
}

export default factory;
