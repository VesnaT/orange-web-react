import Canvas from "./Canvas";
import { useParams } from "react-router-dom";
import { Workflows } from "../mockedData";
import React from "react";

export default function Orange() {
  const params = useParams();
  const [workflows, setWorkflows] = React.useState<any>(Workflows);

  return (
    <div>
      <Canvas
        workflow={workflows.find((w: any) => w.workflowIDx === params.id)}
      />
    </div>
  );
}
