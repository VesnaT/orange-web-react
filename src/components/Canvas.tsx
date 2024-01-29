import React, { useEffect, useRef, useState } from "react";
import Node from "./Node";
import { COLORS } from "../utils/colors";
import { RADIUS } from "./Node";
import { getWorkflows, NodeI, WorkflowI } from "../api/workflows.api";

export default function Canvas({ workflowID }: any) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [workflow, setWorkflow] = useState<undefined | WorkflowI>(undefined);

  const fetchWorkflow = async (wID: string) => {
    const data = await getWorkflows();
    setWorkflow(data["workflows"].find((w: WorkflowI) => w.id === wID));
  };
  useEffect(() => {
    fetchWorkflow(workflowID);
  }, [workflowID]);

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  const handleMouseUp = (event: React.MouseEvent<any, MouseEvent>) => {
    if (isDragging) {
      setIsDragging(false);
      return;
    }

    const rect = canvasRef.current!.getBoundingClientRect();
    setIsDragging(false);
    setWorkflow({
      ...workflow,
      nodes: [
        ...workflow.nodes,
        {
          id: workflow.nodes.length + 1,
          x: event.clientX - rect.x - RADIUS,
          y: event.clientY - rect.y - RADIUS,
          fill: COLORS[workflow.nodes.length % COLORS.length],
        },
      ],
    });
  };
  return (
    <div>
      <div className="canvas" ref={canvasRef} onMouseUp={handleMouseUp}>
        {workflow.nodes.map((node: NodeI) => (
          <Node
            key={node.id}
            x={node.x}
            y={node.y}
            fill={node.fill}
            isDraggingSetter={setIsDragging}
          />
        ))}
      </div>
    </div>
  );
}
