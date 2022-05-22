import { Sprite } from "./classes/sprite.js";
import { canvas } from "./canvas.js";

/**
 *
 * @param {{position : {x : number , y : number}}} attackBox
 * @param {Sprite} target
 * @returns
 */
export const isColliding = (attackBox, target) => {
  if (!target || !target.position) return;

  const leftCollision =
    attackBox.position.x + attackBox.width >= target.position.x;
  const rightCollision =
    attackBox.position.x <= target.position.x + Sprite.Width;
  const topCollision =
    attackBox.position.y + attackBox.height >= target.position.y;
  const bottomCollision =
    attackBox.position.y <= target.position.y + Sprite.Height;

  return rightCollision && leftCollision && topCollision && bottomCollision;
};

/**
 *
 * @param {'left' | 'right'} direction : ;
 * @param {{x: number, y : number }} position
 */
export const checkOverlap = (direction, position) => {
  switch (direction) {
    case "left":
      if (position.x <= 0) position.x = 0;
      break;
    case "right":
      if (position.x >= canvas.width - Sprite.Width)
        position.x = canvas.width - Sprite.Width;
      break;
  }
};
