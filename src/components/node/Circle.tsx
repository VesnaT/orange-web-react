import { RADIUS } from "./Node";
import React from "react";

export const Circle = ({ fill, onMouseDown, onMouseUp }: any) => {
  return (
    <circle
      style={{
        cursor: "grab",
      }}
      cx={RADIUS}
      cy={RADIUS}
      r={RADIUS}
      fill={fill}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};
