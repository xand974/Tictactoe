import { Boundary } from "./boundary.js";
import { canvas } from "./canvas.js";
import { Movable } from "./movable.js";
import { generateTile } from "./utils.helper.js";

export function initGame(ctx) {
  for (let row = 0; row < canvas.width; row += Boundary.Height * 2) {
    for (let column = 0; column < canvas.height; column += Boundary.Width / 2) {
      let random = Math.floor(Math.random() * 2);
      if (random === 1) {
        generateTile({ Sprite: Boundary, row, column, ctx });
        continue;
      }
      generateTile({ Sprite: Movable, row, column, ctx });
    }
  }
}
