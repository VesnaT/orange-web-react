export interface NodeI {
  id: number;
  x: number;
  y: number;
  fill: string;
  name: string;
  connections: Array<number>;
}

export interface WorkflowI {
  id: string;
  nodes: Array<NodeI>;
}

export interface WorkflowsI {
  workflows: Array<WorkflowI>;
}

export interface NameI {
  name: string;
}

export const getWorkflows = async (): Promise<WorkflowsI> => {
  const response = await fetch(process.env.REACT_APP_API_URL + "/data");
  return await response.json();
};

export const saveWorkflow = async (workflow: WorkflowI, sessionID: string) => {
  const workflowWithSessionID: any = workflow;
  workflowWithSessionID.sessionID = sessionID;
  fetch(process.env.REACT_APP_API_URL + "/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workflowWithSessionID),
  });
};

export const getName = async (workflowID: string): Promise<NameI> => {
  const response = await fetch(
    process.env.REACT_APP_API_URL + `/name/${workflowID}`,
  );
  return await response.json();
};
