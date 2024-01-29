import React, { useCallback, useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
export const RADIUS = 56;

function Node({ id, x, y, fill, isDraggingSetter, callback }: any) {
  const [color, setColor] = useState(fill);
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
    });
    setColor(color_);
  };

  const setPosAndSave = (x_: number, y_: number) => {
    callback({
      id: id,
      x: x_,
      y: y_,
      fill: color,
    });
    setColor(color);
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
  const handleMouseUp = (e: any) => {
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

  const escFunction = useCallback((event: any) => {
    if (event.key === "Escape") {
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
          viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
          xmlns="http://www.w3.org/2000/svg"
          width={RADIUS * 2}
          height={RADIUS * 2}
          style={{
            position: "absolute",
            left: draggableState.posX,
            top: draggableState.posY,
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
          <rect
            style={{
              cursor: "pointer",
            }}
            y="3"
            x="3"
            width="13"
            height="13"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
            }}
          />
        </svg>
      </div>
      {isEditing && (
        <ColorPicker selectedColor={color} callback={setColorAndSave} />
      )}
    </div>
  );
}

export default Node;
