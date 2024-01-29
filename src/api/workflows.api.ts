export interface NodeI {
  id: number;
  x: number;
  y: number;
  fill: string;
}

export interface WorkflowI {
  id: string;
  nodes: Array<NodeI>;
}

export interface WorkflowsI {
  workflows: Array<WorkflowI>;
}

export const getWorkflows = async (): Promise<WorkflowsI> => {
  const response = await fetch(process.env.REACT_APP_API_URL + "/data");
  return await response.json();
};
