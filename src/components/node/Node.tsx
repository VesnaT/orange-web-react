import React, { useCallback, useEffect, useState } from "react";
import ColorPicker from "../ColorPicker";
import { Name } from "./Name";
import { EditButton } from "./EditButton";
export const RADIUS = 56;

export const Node = ({
  workflowID,
  id,
  x,
  y,
  fill,
  name,
  isDraggingSetter,
  callback,
}: any) => {
  const [color, setColor] = useState(fill);
  const [text, setText] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [draggableState, setDraggableState] = useState({
    isDown: false,
    posX: x,
    posY: y,
    screenX: 0,
    screenY: 0,
  });

  const setColorAndSave = (color_: string) => {
    callback({
      id: id,
      x: draggableState.posX,
      y: draggableState.posY,
      fill: color_,
      name: text,
    });
    setColor(color_);
  };

  const setPosAndSave = (x_: number, y_: number) => {
    callback({
      id: id,
      x: x_,
      y: y_,
      fill: color,
      name: text,
    });
  };

  const setTextAndSave = (text_: string) => {
    callback({
      id: id,
      x: x,
      y: y,
      fill: color,
      name: text_,
    });
    setText(text_);
  };

  const handleMouseDown = (e: any) => {
    setDraggableState({
      ...draggableState,
      isDown: true,
      screenX: e.screenX,
      screenY: e.screenY,
    });
    isDraggingSetter(true);
  };

  const handleMouseMove = (e: any) => {
    if (draggableState.isDown) {
      const shiftX = e.screenX - draggableState.screenX;
      const shiftY = e.screenY - draggableState.screenY;
      setDraggableState({
        ...draggableState,
        posX: draggableState.posX + shiftX,
        posY: draggableState.posY + shiftY,
        screenX: e.screenX,
        screenY: e.screenY,
      });
    }
  };

  const handleMouseUp = () => {
    if (draggableState.isDown) {
      setDraggableState({
        ...draggableState,
        isDown: false,
        screenX: 0,
        screenY: 0,
      });
      setPosAndSave(draggableState.posX, draggableState.posY);
    }
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
      <div>
        <svg
          viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2 + 20}`}
          xmlns="http://www.w3.org/2000/svg"
          width={RADIUS * 2}
          height={RADIUS * 2 + 30}
          style={{
            position: "absolute",
            left: draggableState.posX,
            top: draggableState.posY,
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
          }}
        >
          <circle
            style={{
              cursor: "move",
            }}
            cx={RADIUS}
            cy={RADIUS}
            r={RADIUS}
            fill={color}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          <EditButton callback={setIsEditing} />
          <Name workflowID={workflowID} name={text} callback={setTextAndSave} />
        </svg>
      </div>
      {isEditing && (
        <ColorPicker selectedColor={color} callback={setColorAndSave} />
      )}
    </div>
  );
};

export default Node;
