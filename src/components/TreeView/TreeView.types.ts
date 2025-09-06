export type TreeList = Record<string, Item>;
export type Item = {
  text: string;
  icon?: [string, string];
  list?: TreeList;
  defaultState?: boolean;
  children?: React.ReactNode;
};
