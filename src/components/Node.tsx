import React from "react";

export const radius = 56;

function Node({ x, y, fill }: any) {
  return (
    <div>
      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        xmlns="http://www.w3.org/2000/svg"
        width={radius * 2}
        height={radius * 2}
        style={{ position: "absolute", left: x, top: y }}
      >
        <circle cx={radius} cy={radius} r={radius} fill={fill} />
      </svg>
    </div>
  );
}

export default Node;
