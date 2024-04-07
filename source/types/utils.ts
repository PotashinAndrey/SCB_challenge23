/** Хелпер для получения итоговой структуры в сложно-сочинённых типах */
export type Explain<T> = T extends (...args: infer A) => infer R
  ? (...args: Explain<A>) => Explain<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;
