import React, { useCallback, useEffect, useState } from "react";
import ColorPicker from "../ColorPicker";
import { Name } from "./Name";
import { LeftEar, RightEar } from "./Ear";
import { Circle } from "./Circle";
export const RADIUS = 56;
export const OFFSET = Math.floor(RADIUS / 3);

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
  setConnectingNode,
  connectNode,
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

  const leftEarMouseUp = (e: any) => {
    e.stopPropagation();
    connectNode(id);
  };

  const rightEarMouseDown = (e: any) => {
    e.stopPropagation();
    setConnectingNode(id);
  };

  const circleMouseDown = (e: any) => {
    if (e.button === 2) {
      e.stopPropagation();
      return;
    }
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
  };

  const circleMouseUp = (e: any) => {
    e.stopPropagation();
    if (eX !== null && eY !== null) {
      if (eX === e.clientX && eY === e.clientY) {
        setIsEditing(true);
      }
    }
    setDraggingNode(null);
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
        width={RADIUS * 2 + OFFSET * 2}
        height={RADIUS * 2 + 30}
        style={{
          position: "absolute",
          left: x - RADIUS - OFFSET,
          top: y - RADIUS,
        }}
      >
        <LeftEar onMouseUp={leftEarMouseUp} />
        <Circle
          fill={fill}
          onMouseDown={circleMouseDown}
          onMouseUp={circleMouseUp}
        />
        <RightEar onMouseDown={rightEarMouseDown} />
        <Name workflowID={workflowID} name={name} callback={setText} />
      </svg>
      {isEditing && <ColorPicker selectedColor={fill} callback={setColor} />}
    </div>
  );
};

export default Node;
