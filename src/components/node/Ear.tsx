import React from "react";
import { OFFSET, RADIUS } from "./Node";

export const RightEar = ({ onMouseDown }: any) => {
  return (
    <path
      className="widget-ear"
      d={`M ${RADIUS * 2 - Math.round(RADIUS / 5)} ${Math.round(RADIUS / 11)} C ${RADIUS * 2 + OFFSET} ${Math.round(RADIUS / 2)}, ${RADIUS * 2 + OFFSET} ${RADIUS * 2 - Math.round(RADIUS / 2)}, ${RADIUS * 2 - Math.round(RADIUS / 5)}  ${RADIUS * 2 - Math.round(RADIUS / 11)}`}
      fill="transparent"
      onMouseDown={onMouseDown}
    />
  );
};

export const LeftEar = ({ onMouseUp }: any) => {
  return (
    <path
      className="widget-ear"
      d={`M ${Math.round(RADIUS / 5)} ${Math.round(RADIUS / 11)} C -${OFFSET} ${Math.round(RADIUS / 2)}, -${OFFSET} ${RADIUS * 2 - Math.round(RADIUS / 2)}, ${Math.round(RADIUS / 5)} ${RADIUS * 2 - Math.round(RADIUS / 11)}`}
      fill="transparent"
      onMouseUp={onMouseUp}
    />
  );
};
