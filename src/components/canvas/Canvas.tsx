import React, { useEffect, useRef, useState } from "react";
import Node from "../node/Node";
import { COLORS } from "../../utils/colors";
import { RADIUS } from "../node/Node";
import { getName, NodeI, WorkflowI } from "../../api/workflows.api";
import useWorkflow from "./useWorkflow";
import { socket } from "../../socket";

export default function Canvas({ workflowID }: any) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingNode, setDraggingNode] = useState<any>(null);
  const { workflow, setAndSaveWorkflow, setWorkflow } = useWorkflow(workflowID);

  useEffect(() => {
    function onUpdate(value: WorkflowI) {
      setWorkflow(value);
    }
    socket.on("update", onUpdate);
    return () => {
      socket.off("update", onUpdate);
    };
  }, [setWorkflow]);

  const addNode = async (x: number, y: number) => {
    if (!workflow) {
      return;
    }
    const nodeName = await getName(workflowID);
    const addedNodeWorkflow: WorkflowI = {
      ...workflow,
      nodes: [
        ...workflow.nodes,
        {
          id: workflow.nodes.length + 1,
          x: x,
          y: y,
          fill: COLORS[workflow.nodes.length % COLORS.length],
          name: nodeName["name"],
        },
      ],
    };
    setAndSaveWorkflow(addedNodeWorkflow);
  };

  const updateNode = ({ id, x, y, fill, name }: NodeI) => {
    if (!workflow) {
      return;
    }
    const updatedNodeWorkflow: WorkflowI = {
      ...workflow,
    };
    updatedNodeWorkflow.nodes = updatedNodeWorkflow.nodes.map((node: NodeI) => {
      if (node.id === id) {
        return { id, x, y, fill, name };
      }
      return node;
    });
    setAndSaveWorkflow(updatedNodeWorkflow);
  };

  const handleMouseMove = (event: React.MouseEvent<any, MouseEvent>) => {
    if (draggingNode) {
      const { id, x, y, fill, name, eX, eY } = draggingNode;
      const deltaX = event.clientX - eX;
      const deltaY = event.clientY - eY;
      updateNode({
        id,
        x: x + deltaX,
        y: y + deltaY,
        fill,
        name,
      });
    }
  };

  const handleMouseDown = (event: React.MouseEvent<any, MouseEvent>) => {
    setDraggingNode(null);
  };

  const handleMouseUp = (event: React.MouseEvent<any, MouseEvent>) => {
    if (draggingNode) {
      setDraggingNode(null);
      return;
    }

    const rect = canvasRef.current!.getBoundingClientRect();
    setDraggingNode(null);
    addNode(event.clientX - rect.x - RADIUS, event.clientY - rect.y - RADIUS);
  };

  if (!workflow) {
    return <div>Workflow not found</div>;
  }
  return (
    <div>
      <div
        className="canvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {workflow.nodes.map((node: NodeI) => (
          <Node
            key={node.id + node.name + node.fill + node.x + node.y}
            workflowID={workflowID}
            id={node.id}
            x={node.x}
            y={node.y}
            fill={node.fill}
            name={node.name}
            eX={draggingNode?.eX}
            eY={draggingNode?.eY}
            callback={updateNode}
            setDraggingNode={setDraggingNode}
          />
        ))}
      </div>
    </div>
  );
}
