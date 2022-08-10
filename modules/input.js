import { canvas } from "./canvas.js";
import { Cube } from "./cube.js";
import { cubeGrid } from "./data.js";
import { Movable } from "./Entities.js";

/**
 *
 * @param {Event & {target : HTMLElement}} e
 */
const handleClick = (e) => {
  const sizeCanvas = canvas.getBoundingClientRect();
  const mousePosition = {
    x: e.x - sizeCanvas.x,
    y: e.y - sizeCanvas.y,
  };
  const cubeClicked = getSelectedCube(mousePosition);
  const canWalk = checkMovable(cubeClicked);
  if (!canWalk) return;
  walk(cubeClicked);
};
canvas.addEventListener("click", handleClick);

const getSelectedCube = ({ x, y }) => {
  const surPlus = {
    x: 2,
    y: 3,
  };
  const mousePos = {
    x: Math.floor(x / surPlus.x),
    y: Math.floor(y / surPlus.y),
  };
  return cubeGrid.find((item) => {
    const checkHorizontal =
      mousePos.x >= item.position.x &&
      mousePos.x <= item.position.x + Cube.Width;
    const checkVertical =
      mousePos.y >= item.position.y &&
      mousePos.y <= item.position.y + Cube.Height;

    if (checkHorizontal && checkVertical) {
      return item;
    }
  });
};

/**
 *
 * @param {Cube} item
 */
const checkMovable = (item) => {
  return item instanceof Movable;
};
