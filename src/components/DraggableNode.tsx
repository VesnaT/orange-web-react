import React, { useState } from "react";
export const radius = 56;

export default function DraggableNode({ x, y, fill, cb }: any) {
  const [state, setState] = useState({
    isDown: false,
    posX: x,
    posY: y,
    screenX: 0,
    screenY: 0,
  });

  const handleMouseDown = (e: any) => {
    setState({
      ...state,
      isDown: true,
      screenX: e.screenX,
      screenY: e.screenY,
    });
  };
  const handleMouseMove = (e: any) => {
    if (state.isDown) {
      const shiftX = e.screenX - state.screenX;
      const shiftY = e.screenY - state.screenY;
      setState({
        ...state,
        posX: state.posX + shiftX,
        posY: state.posY + shiftY,
        screenX: e.screenX,
        screenY: e.screenY,
      });
    }
  };
  const handleMouseUp = (e: any) => {
    setState({
      ...state,
      isDown: false,
      screenX: 0,
      screenY: 0,
    });
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    cb(true);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        xmlns="http://www.w3.org/2000/svg"
        width={radius * 2}
        height={radius * 2}
        style={{ position: "absolute", left: state.posX, top: state.posY }}
      >
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          fill={fill}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        <rect y="3" x="3" width="13" height="13" onClick={handleClick} />
      </svg>
    </div>
  );
}