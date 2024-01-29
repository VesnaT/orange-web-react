import React, { useEffect, useRef, useState } from "react";
import Node from "./Node";
import { COLORS } from "../utils/colors";
import { RADIUS } from "./Node";
import {
  getWorkflows,
  saveWorkflow,
  NodeI,
  WorkflowI,
} from "../api/workflows.api";

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

  const addNode = (x: number, y: number) => {
    const addedNodeWorkflow: WorkflowI = {
      ...workflow,
      nodes: [
        ...workflow.nodes,
        {
          id: workflow.nodes.length + 1,
          x: x,
          y: y,
          fill: COLORS[workflow.nodes.length % COLORS.length],
        },
      ],
    };
    setAndSaveWorkflow(addedNodeWorkflow);
  };

  const updateNode = ({ id, x, y, fill }: NodeI) => {
    const updatedNodeWorkflow: WorkflowI = {
      ...workflow,
    };
    updatedNodeWorkflow.nodes = updatedNodeWorkflow.nodes.map((node: NodeI) => {
      if (node.id === id) {
        return { id, x, y, fill };
      }
      return node;
    });
    setAndSaveWorkflow(updatedNodeWorkflow);
  };

  const setAndSaveWorkflow = (updatedWorkflow: WorkflowI) => {
    setWorkflow(updatedWorkflow);
    saveWorkflow(updatedWorkflow);
  };

  const handleMouseUp = (event: React.MouseEvent<any, MouseEvent>) => {
    if (isDragging) {
      setIsDragging(false);
      return;
    }

    const rect = canvasRef.current!.getBoundingClientRect();
    setIsDragging(false);
    addNode(event.clientX - rect.x - RADIUS, event.clientY - rect.y - RADIUS);
  };
  return (
    <div>
      <div className="canvas" ref={canvasRef} onMouseUp={handleMouseUp}>
        {workflow.nodes.map((node: NodeI) => (
          <Node
            key={node.id}
            id={node.id}
            x={node.x}
            y={node.y}
            fill={node.fill}
            isDraggingSetter={setIsDragging}
            callback={updateNode}
          />
        ))}
      </div>
    </div>
  );
}
