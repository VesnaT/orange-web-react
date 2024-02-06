import React, { useEffect, useRef, useState } from "react";
import Node from "../node/Node";
import { COLORS } from "../../utils/colors";
import { getName, NodeI, WorkflowI } from "../../api/workflows.api";
import useWorkflow from "./useWorkflow";
import { socket } from "../../socket";
import { Connection } from "../connection/Connection";

export default function Canvas({ workflowID }: any) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingNode, setDraggingNode] = useState<any>(null);
  const [connectingNode, setConnectingNode] = useState<any>(null);
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
          connections: [],
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
        return { id, x, y, fill, name, connections: node.connections };
      }
      return node;
    });
    setAndSaveWorkflow(updatedNodeWorkflow);
  };

  const connectNode = (id: number) => {
    //console.log("connectNode", connectingNode, id);
  };

  const handleMouseMove = (event: React.MouseEvent<any, MouseEvent>) => {
    if (draggingNode) {
      const { id, x, y, fill, name, eX, eY } = draggingNode;
      const node = workflow?.nodes.find((n) => n.id === id);
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
    addNode(event.clientX - rect.x, event.clientY - rect.y);
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
        {workflow.nodes.map((node: NodeI) => {
          return (
            <div>
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
                setConnectingNode={setConnectingNode}
                connectNode={connectNode}
              />
              {node.connections.map((id: number) => {
                const conn: NodeI | undefined = workflow.nodes.find(
                  (n) => n.id === id,
                );
                if (!conn) {
                  return null;
                }
                return (
                  <Connection
                    key={
                      id.toString() +
                      node.id +
                      node.name +
                      node.fill +
                      node.x +
                      node.y
                    }
                    x1={node.x}
                    y1={node.y}
                    x2={conn.x}
                    y2={conn.y}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
