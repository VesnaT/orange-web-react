import React, { useCallback, useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import DraggableCircle from "./DraggableCircle";

function Node({ x, y, fill }: any) {
  const [color, setColor] = useState(fill);
  const [isEditing, setIsEditing] = useState(false);

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
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
    >
      <DraggableCircle x={x} y={y} fill={color} />
      {isEditing && (
        <div>
          <ColorPicker selectedColor={color} callback={setColor} />
        </div>
      )}
    </div>
  );
}

export default Node;
