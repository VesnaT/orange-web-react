import { OFFSET, RADIUS } from "../node/Node";

export const Connection = ({ x1, y1, x2, y2 }: any) => {
  const offset = RADIUS + OFFSET / 2;

  let x = Math.min(x1, x2) + offset;
  let width = Math.abs(x1 - x2) - 2 * offset;

  let y = Math.min(y1, y2);
  let height = Math.abs(y1 - y2);
  let y1_ = y1 < y2 ? 0 : height;
  let y2_ = y1 < y2 ? height : 0;

  if (x2 - x1 < 2 * offset) {
    y1_ = y1 < y2 ? height : 0;
    y2_ = y1 < y2 ? 0 : height;
    width = x1 - x2 + 2 * offset;
    x = x2 - offset;
  }

  let x1_ = 0;
  let x2_ = width;

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        style={{
          position: "absolute",
          left: x,
          top: y,
        }}
      >
        <path
          d={`M ${x1_} ${y1_} C ${x1_ + 100} ${y1_} ${x2_ - 100} ${y2_} ${x2_} ${y2_}`}
          stroke={"black"}
          strokeWidth={3}
          fill="transparent"
        />
      </svg>
    </div>
  );
};
