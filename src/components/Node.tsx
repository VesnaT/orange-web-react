import { useCallback, useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";

export const radius = 56;

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
      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        xmlns="http://www.w3.org/2000/svg"
        width={radius * 2}
        height={radius * 2}
        style={{ position: "absolute", left: x, top: y }}
      >
        <circle cx={radius} cy={radius} r={radius} fill={color} />
      </svg>
      {isEditing && (
        <div>
          <ColorPicker selectedColor={color} callback={setColor} />
        </div>
      )}
    </div>
  );
}

export default Node;
