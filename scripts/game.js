import { Boundary } from "./boundary.js";
import { canvas, ctx } from "./canvas.js";
import { Movable } from "./movable.js";
import { generateTile } from "./utils.helper.js";
import { InputHandler } from "./inputs.js";
export class GameManager {
  static Instance = new GameManager();
  constructor() {
    this.board = [];
    this.inputHandler = new InputHandler({ board: this.board });
  }

  initGame(ctx) {
    for (let row = 0; row < canvas.width; row += Boundary.Height * 2) {
      for (
        let column = 0;
        column < canvas.height;
        column += Boundary.Width / 2
      ) {
        let random = Math.floor(Math.random() * 10);
        if (random < 4) {
          generateTile({ Sprite: Boundary, row, column, ctx });
          this.board.push(new Boundary({ position: { x: row, y: column } }));
          continue;
        }
        this.board.push(new Movable({ position: { x: row, y: column } }));
        generateTile({ Sprite: Movable, row, column, ctx });
      }
    }
    this.draw();
    this.draw();
  }

  animate() {
    this.reset();
    const id = requestAnimationFrame(() => {
      this.animate();
    });
    this.draw();
  }

  reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  draw() {
    for (const item of this.board) {
      generateTile({
        color: item.color,
        row: item.position.x,
        column: item.position.y,
        ctx,
      });
    }
  }
}
