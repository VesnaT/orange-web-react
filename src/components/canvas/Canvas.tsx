import React, { useEffect, useRef, useState } from "react";
import Node from "../node/Node";
import { COLORS } from "../../utils/colors";
import { getName, NodeI, WorkflowI } from "../../api/workflows.api";
import useWorkflow from "./useWorkflow";
import { socket } from "../../socket";
import { Connection } from "../connection/Connection";

interface UpdatedWorkflowI {
  workflowID: string;
  sessionID: string;
}

export default function Canvas({ workflowID }: any) {
  const [sessionID, setSessionID] = useState<string>(
    Math.random().toString().substring(2),
  );
  console.log("Canvas", workflowID, sessionID);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingNode, setDraggingNode] = useState<any>(null);
  const [connectingNode, setConnectingNode] = useState<any>(null);
  const { workflow, setAndSaveWorkflow, setWorkflow, fetchWorkflow } =
    useWorkflow(workflowID, sessionID);

  useEffect(() => {
    function onUpdated(updated: UpdatedWorkflowI) {
      if (
        updated.workflowID !== workflowID ||
        updated.sessionID === sessionID
      ) {
        return;
      }
      fetchWorkflow(workflowID);
    }
    socket.on("updated", onUpdated);
    return () => {
      socket.off("updated", onUpdated);
    };
  }, [workflowID, setWorkflow]);

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
    if (!workflow || connectingNode === null) {
      return;
    }
    const updatedNodeWorkflow: WorkflowI = {
      ...workflow,
    };
    updatedNodeWorkflow.nodes = updatedNodeWorkflow.nodes.map((node: NodeI) => {
      if (node.id === connectingNode) {
        return {
          id: node.id,
          x: node.x,
          y: node.y,
          fill: node.fill,
          name: node.name,
          connections: [...node.connections, id],
        };
      }
      return node;
    });
    setAndSaveWorkflow(updatedNodeWorkflow);
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
        connections: node?.connections || [],
      });
    }
  };

  const handleMouseDown = (event: React.MouseEvent<any, MouseEvent>) => {
    setDraggingNode(null);
    setConnectingNode(null);
  };

  const handleMouseUp = (event: React.MouseEvent<any, MouseEvent>) => {
    if (draggingNode || connectingNode) {
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
                key={
                  node.id +
                  node.name +
                  node.fill +
                  node.x +
                  node.y +
                  node.connections
                }
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
                      node.id +
                      node.name +
                      node.fill +
                      node.x +
                      node.y +
                      node.connections +
                      id
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
