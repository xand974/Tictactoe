import { Boundary } from "./boundary.js";
import { canvas, ctx } from "./canvas.js";
import { Movable } from "./movable.js";
import { InputHandler } from "./inputs.js";
import { Player } from "./player.js";
import { UI } from "./ui.js";
export class GameManager {
  static Instance = new GameManager();
  constructor() {
    this.board = [];
    this.player = new Player({});
    // new UI();
    this.inputHandler = new InputHandler({
      board: this.board,
      player: this.player,
    });
  }

  initGame() {
    this.initBoard();
    this.initPlayer();
    this.draw();
  }

  initPlayer() {
    const randomColumnIndex = Math.floor(Math.random() * this.board.length);
    const randomRowTile = this.board[randomColumnIndex];
    const randomRowIndex = Math.floor(Math.random() * randomRowTile.length);
    const selectedTile = randomRowTile[randomRowIndex];
    if (selectedTile instanceof Boundary) this.initPlayer();
    const randomX = selectedTile.position.x;
    const randomY = selectedTile.position.y;
    this.player.position = {
      x: randomX,
      y: randomY,
    };
  }

  initBoard() {
    for (let row = 0; row < canvas.width; row += Boundary.Height) {
      let rowArray = [];
      for (let column = 0; column < canvas.height; column += Boundary.Width) {
        column = Math.floor(column);
        row = Math.floor(row);
        let random = Math.floor(Math.random() * 10);
        if (random < 4) {
          rowArray.push(new Boundary({ position: { x: row, y: column } }));
          continue;
        }
        rowArray.push(new Movable({ position: { x: row, y: column } }));
      }
      this.board.push(rowArray);
      rowArray = [];
    }
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
      for (const i of item) {
        i.draw();
      }
    }
    this.player.draw();
  }
}
