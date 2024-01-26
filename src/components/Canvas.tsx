import React, { useRef, useState } from "react";
import Node from "./Node";
import { COLORS } from "../utils/colors";
import { RADIUS } from "./Node";

export default function Canvas({ workflow }: any) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [workflow_, setWorkflow_] = useState<any>(workflow);
  if (!workflow_) {
    return <div>Workflow not found</div>;
  }

  const handleMouseUp = (event: React.MouseEvent<any, MouseEvent>) => {
    if (isDragging) {
      setIsDragging(false);
      return;
    }

    const rect = canvasRef.current!.getBoundingClientRect();
    setIsDragging(false);
    setWorkflow_({
      ...workflow_,
      nodes: [
        ...workflow_.nodes,
        {
          id: workflow_.nodes.length + 1,
          x: event.clientX - rect.x - RADIUS,
          y: event.clientY - rect.y - RADIUS,
          fill: COLORS[workflow_.nodes.length % COLORS.length],
        },
      ],
    });
  };
  return (
    <div>
      <div className="canvas" ref={canvasRef} onMouseUp={handleMouseUp}>
        {workflow_.nodes.map((node: any) => (
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
