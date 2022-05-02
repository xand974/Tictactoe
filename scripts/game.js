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
    const randomIndex = Math.floor(Math.random() * this.board.length);
    const selectedTile = this.board[randomIndex];
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
      for (let column = 0; column < canvas.height; column += Boundary.Width) {
        column = Math.floor(column);
        row = Math.floor(row);
        let random = Math.floor(Math.random() * 10);
        if (random < 4) {
          this.board.push(new Boundary({ position: { x: row, y: column } }));
          continue;
        }
        this.board.push(
          new Movable({ position: { x: row, y: column }, isHovered: false })
        );
      }
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
      item.draw();
    }
    this.player.draw();
  }
}
