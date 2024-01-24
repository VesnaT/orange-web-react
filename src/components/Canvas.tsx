import React from "react";
import Node, { radius } from "./Node";

export default function Canvas({ workflow }: any) {
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const [workflow_, setWorkflow_] = React.useState<any>(workflow);
  if (!workflow_) {
    return <div>Workflow not found</div>;
  }

  function handleClick(event: React.MouseEvent<any, MouseEvent>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    setWorkflow_({
      ...workflow_,
      nodes: [
        ...workflow_.nodes,
        {
          id: workflow_.nodes.length + 1,
          x: event.clientX - rect.x - radius,
          y: event.clientY - rect.y - radius,
          fill: "#3f51b5",
        },
      ],
    });
  }
  return (
    <div>
      <div className="canvas" ref={canvasRef} onClick={handleClick}>
        {workflow_.nodes.map((node: any) => (
          <Node key={node.id} x={node.x} y={node.y} fill={node.fill} />
        ))}
      </div>
    </div>
  );
}
