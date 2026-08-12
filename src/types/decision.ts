export interface Decision {
  id: number;
  category: string;
  priority: string;
  status: string;
  title: string;
  description: string;
  author: string;
  date: string;
  workspace: string;
  document: string;
}
export interface Decision {
  id: string;

  title: string;

  category: string;

  priority: string;

  status: string;

  summary: string;

  businessContext: string;

  problemStatement: string;

  impacts: {
    revenue: string;
    savings: string;
    timeline: string;
    risk: string;
  };
}
