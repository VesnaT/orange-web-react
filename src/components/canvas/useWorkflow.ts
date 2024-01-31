import { useEffect, useState } from "react";
import { getWorkflows, saveWorkflow, WorkflowI } from "../../api/workflows.api";

export default function useWorkflow(workflowID: string) {
  const [workflow, setWorkflow] = useState<undefined | WorkflowI>(undefined);

  const fetchWorkflow = async (wID: string) => {
    const data = await getWorkflows();
    setWorkflow(data["workflows"].find((w: WorkflowI) => w.id === wID));
  };
  useEffect(() => {
    setWorkflow(undefined);
    fetchWorkflow(workflowID);
  }, [workflowID]);

  const setAndSaveWorkflow = (updatedWorkflow: WorkflowI) => {
    setWorkflow(updatedWorkflow);
    saveWorkflow(updatedWorkflow);
  };

  return { workflow, setAndSaveWorkflow, setWorkflow };
}
