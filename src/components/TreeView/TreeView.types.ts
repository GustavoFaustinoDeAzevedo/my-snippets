type Icons = {
  toggle?: { open: string; close: string };
  leaf?: string[];
};

export type Node = {
  id: string;
  label: string;
  icon?: Icons;
  children?: Node[];
  defaultState?: boolean;
  [key: string]: any;
};
