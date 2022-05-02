import { Sprite } from "./sprite.js";

export const generateTile = ({ row, column, color }) => {
  const sprite = new Sprite({
    color,
    position: { x: row, y: column },
  });
};

export const generateRandomColor = () => {
  let random =
    Math.floor(Math.random() * 255) < 0 ? 0 : Math.floor(Math.random() * 256);
  return `rgb(${random - 100}, ${random - 150} , ${random - 70})`;
};
