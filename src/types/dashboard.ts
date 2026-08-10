export type StatCard = {
  id: number;
  title: string;
  value: number;
};

export type Activity = {
  id: number;
  title: string;
  subtitle: string;
};

export type Decision = {
  id: number;
  category: string;
  title: string;
};

export type DocumentItem = {
  id: number;
  name: string;
  type: string;
  modified: string;
  status: string;
};