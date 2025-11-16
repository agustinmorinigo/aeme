export interface Option<E extends string | number = string> {
  value: E;
  label: string;
}

export interface OptionWithDescription<E extends string | number = string> extends Option<E> {
  description: string;
}
