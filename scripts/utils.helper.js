export const generateTile = ({ Sprite, row, column, ctx }) => {
  const sprite = new Sprite({
    position: { x: row, y: column },
  });
  sprite.draw(ctx);
};

export const generateRandomColor = () => {
  let random =
    Math.floor(Math.random() * 255) < 0 ? 0 : Math.floor(Math.random() * 256);
  return `rgb(${random - 100}, ${random - 150} , ${random - 70})`;
};
