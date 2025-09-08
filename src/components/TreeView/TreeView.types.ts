export type Node = {
  id: string;
  label: string;
  icon?: [string, string];
  children?: Node[];
  defaultState?: boolean;
  [key: string]: any;
};
