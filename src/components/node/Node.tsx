import React, { useCallback, useEffect, useState } from "react";
import ColorPicker from "../ColorPicker";
import { Name } from "./Name";
export const RADIUS = 56;

export const Node = ({
  workflowID,
  id,
  x,
  y,
  fill,
  name,
  eX,
  eY,
  callback,
  setDraggingNode,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);

  const setColor = (color_: string) => {
    callback({
      id: id,
      x: x,
      y: y,
      fill: color_,
      name: name,
    });
  };

  const setText = (text_: string) => {
    callback({
      id: id,
      x: x,
      y: y,
      fill: fill,
      name: text_,
    });
  };

  const escFunction = useCallback((e: any) => {
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <div>
      <svg
        viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2 + 30}`}
        xmlns="http://www.w3.org/2000/svg"
        width={RADIUS * 2 + 18 * 2}
        height={RADIUS * 2 + 30}
        style={{
          position: "absolute",
          left: x - RADIUS - 18,
          top: y - RADIUS,
        }}
      >
        <circle
          style={{
            cursor: "grab",
          }}
          cx={RADIUS}
          cy={RADIUS}
          r={RADIUS}
          fill={fill}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDraggingNode({
              id,
              x,
              y,
              fill,
              name,
              eX: e.clientX,
              eY: e.clientY,
            });
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            if (eX !== null && eY !== null) {
              if (eX === e.clientX && eY === e.clientY) {
                setIsEditing(true);
              }
            }
            setDraggingNode(null);
          }}
        />
        <path
          className="widget-ear"
          d="M 100 5 C 130 30, 130 80, 100 107"
          fill="transparent"
        />
        <path
          className="widget-ear"
          d="M 12 5 C -18 30, -18 80, 12 107"
          fill="transparent"
        />
        <Name workflowID={workflowID} name={name} callback={setText} />
      </svg>
      {isEditing && <ColorPicker selectedColor={fill} callback={setColor} />}
    </div>
  );
};

export default Node;
