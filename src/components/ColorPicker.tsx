import { COLORS } from "../utils/colors";

const Circle = ({ color, isSelected, callback }: any) => {
  let background = color;
  let boxShadow = "none";
  let border = `3px solid ${color}`;
  if (isSelected) {
    background = "#fff";
    boxShadow = `0 0 4px 2px ${color}`;
  }
  return (
    <button
      className="picker-circle"
      style={{
        background: background,
        border: border,
        boxShadow: boxShadow,
      }}
      onClick={(e) => {
        e.stopPropagation();
        callback(color);
      }}
    />
  );
};

const ColorPicker = ({ selectedColor, callback }: any) => {
  return (
    <div
      className="picker"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {COLORS.map((c) => (
        <Circle
          key={c}
          color={c}
          isSelected={selectedColor === c}
          callback={callback}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
