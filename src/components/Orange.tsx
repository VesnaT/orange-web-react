import Canvas from "./Canvas";
import { useParams } from "react-router-dom";
import { Workflows } from "../mockedData";
import { useState } from "react";

export default function Orange() {
  const params = useParams();
  const [workflows, setWorkflows] = useState<any>(Workflows);

  return (
    <div>
      <Canvas
        workflow={workflows.find((w: any) => w.workflowID === params.id)}
      />
    </div>
  );
}
