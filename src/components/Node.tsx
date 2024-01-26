import React, { useCallback, useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import DraggableNode from "./DraggableNode";

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
    <div>
      <DraggableNode x={x} y={y} fill={color} cb={setIsEditing} />
      {isEditing && <ColorPicker selectedColor={color} callback={setColor} />}
    </div>
  );
}

export default Node;
