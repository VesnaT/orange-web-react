import { getName } from "../../api/workflows.api";
import React from "react";

export const Name = ({ workflowID, name, callback }: any) => {
  const fetchName = async (): Promise<any> => {
    const data = await getName(workflowID);
    return data["name"];
  };

  const clickHandler = async () => {
    const newName: Promise<string> = await fetchName();
    callback(newName);
  };

  return (
    <text
      x="50%"
      y="100%"
      textAnchor="middle"
      style={{
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={(e) => {
        clickHandler();
        e.stopPropagation();
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
      }}
    >
      {name}
    </text>
  );
};
