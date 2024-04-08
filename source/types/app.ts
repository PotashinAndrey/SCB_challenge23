/** Для использования в списках и селектах */
export type OptionType<T extends string> = {
  value: T;
  label: string;
};
