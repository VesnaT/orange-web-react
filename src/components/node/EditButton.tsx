import React from "react";

export const EditButton = ({ callback }: any) => {
  return (
    <rect
      y="3"
      x="3"
      width="13"
      height="13"
      style={{
        cursor: "pointer",
      }}
      onClick={(e) => {
        e.stopPropagation();
        callback(true);
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
      }}
    />
  );
};
